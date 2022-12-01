import {
  useContext,
  useEffect,
} from 'react'
import { deleteFoo, getFoos, updateFoo } from '../services/foos'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import listItemFn from './list-item'
import listItemStyles from './list-item.module.css'
import fooListItemFn from './foo-list-item'
import { Context as ReducerContext } from '../reducer-provider.jsx'
import {
  foosLoadErrorAction,
  foosLoadStartAction,
  foosLoadSuccessAction,
} from '../actions/foo.js'
import { timeout } from '../../common/timeout.js'

export default () => {
  const ListItem = listItemFn(listItemStyles.foo)
  const CancelButton = buttonFn(buttonStyles.removeListItem)
  const EditButton = buttonFn(buttonStyles.editListItem)
  const DeleteButton = buttonFn(buttonStyles.removeListItem)
  const SaveButton = buttonFn(buttonStyles.updateListItem)
  const FooListItem = fooListItemFn(
    CancelButton,
    SaveButton,
    EditButton,
    DeleteButton,
    ListItem,
  )
  const component = (props) => {
    const { state, dispatch } = useContext(ReducerContext)
    console.log('foos', state.foos.fooList)
    const loadFoos = () => {
      dispatch(foosLoadStartAction())
      return Promise.all([getFoos(), timeout(3000)])
        .then(([res]) => {
          console.log('got response', res)
          if(res.status < 400) {
            dispatch(foosLoadSuccessAction(res.json))
          } else {
            dispatch(foosLoadErrorAction(res.json))
          }
        })
        .catch(e => dispatch(foosLoadErrorAction(e)))
    }
    useEffect(() => {
      loadFoos()
    }, [])
    switch(state.foos.loadingMode) {
      case 'loading':
        return <span>Loading Foos!</span>
      case 'error':
        return <span style={{color: 'red'}}>{JSON.stringify(error)}</span>
      case 'success':
        if(state.foos.fooList.length > 0) {
          return <ul>
            {state.foos.fooList.map((foo) => {
              return <FooListItem
                key={foo.id}
                foo={foo}
                onDelete={() => deleteFoo(foo.id).then(loadFoos)}
                onUpdate={(updated) => updateFoo(updated).then(loadFoos)}
              />
            })}
          </ul>
        } else {
          return <span>No Foos found!</span>
        }
      case 'initial':
        return <></>
      default:
        throw new Error(`Unknown loading mode '${state.foos.loadingMode}'.`)
    }
  }
  component.displayName = 'FooList'
  return component
}
