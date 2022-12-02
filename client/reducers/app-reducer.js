import {
  initialState as fooInitialState,
  reducer as fooReducer,
} from './foo-reducer.js'

export const initialState = {
  foos: fooInitialState,
}

export const reducer = (state, action) => {
  const fooState = fooReducer(state.foos, action)
  if(fooState != state.foo) {
    return {
      ...state,
      foos: fooState,
    }
  } else {
    return state
  }
}
