import React, {
  createContext,
  useMemo,
  useReducer,
} from 'react'
import { reducer as appReducer, initialState } from './reducers/app-reducer'

export const Context = createContext({
  state: State,
  dispatch: (_) => undefined,
})

export const Reduced = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const contextValue = useMemo(() => ({state, dispatch }), [state, dispatch])
  return <Context.Provider value={contextValue}>
    {props.children}
  </Context.Provider>
}
