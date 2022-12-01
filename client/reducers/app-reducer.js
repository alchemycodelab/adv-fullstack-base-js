export const initialState = {
  foos: {
    fooList: [],
    loadingMode: 'initial',
    loadingError: null,
  },
}

export const reducer = (state, action) => {
  switch(action.type) {
    case 'foos-load-start':
      return {
        ...state,
        foos: {
          ...state.foos,
          loadingMode: 'loading',
        },
      }
    case 'foos-load-error':
      return {
        ...state,
        foos: {
          ...state.foos,
          foosList: [],
          loadingMode: 'error',
          error: action.error,
        },
      }
    case 'foos-load-success':
      return {
        ...state,
        foos: {
          ...state.foos,
          foosList: action.foos,
          loadingMode: 'error',
          error: null,
        },
      }
  }
  return state
}
