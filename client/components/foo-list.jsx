import {
  useState,
  useEffect,
} from 'react'
import { deleteFoo, getFoos, updateFoo } from '../services/foos'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import listItemFn from './list-item'
import listItemStyles from './list-item.module.css'
import fooListItemFn from './foo-list-item'
import ReducerContext from '../reducer-provider.jsx'
import { foosLoadErrorAction, foosLoadStartAction, foosLoadSuccessAction } from '../actions/foo'

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
    const loadFoos = () => {
      // setLoadingFoos(true)
      dispatch(foosLoadStartAction())
      return getFoos()
        .then(res => {
          if(res.status < 400) {
            foosLoadSuccessAction(res.json)
          } else {
            foosLoadErrorAction(res.json)
          }
        })
        .catch(e => dispatch(foosLoadErrorAction(e)))
    }
    useEffect(() => {
      loadFoos()
    }, [])
    if(state.foos.foosList.length > 0) {
      return <ul>
        {state.foos.foosList.map((foo) => {
          return <FooListItem
            key={foo.id}
            foo={foo}
            onDelete={() => deleteFoo(foo.id).then(loadFoos)}
            onUpdate={(updated) => updateFoo(updated).then(loadFoos)}
          />
        })}
      </ul>
    } else if(error != null) {
      return <span style={{color: 'red'}}>{JSON.stringify(error)}</span>
    } else if(!loadingFoos) {
      return <span>No Foos found!</span>
    } else {
      return <span>Loading Foos!</span>
    }
  }
  component.displayName = 'FooList'
  return component
}
