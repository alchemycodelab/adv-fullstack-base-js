export const initialState = {
  fooList: [],
  loadingMode: 'initial',
  loadingError: null,
}

export const reducer = (state, action) => {
  switch(action.type) {
    case 'foos-load-start':
      return {
        ...state,
        loadingMode: 'loading',
      }
    case 'foos-load-error':
      return {
        ...state,
        fooList: [],
        loadingMode: 'error',
        error: action.error,
      }
    case 'foos-load-success':
      return {
        ...state,
        fooList: action.foos,
        loadingMode: 'success',
        error: null,
      }
    default:
      return state
  }
}
