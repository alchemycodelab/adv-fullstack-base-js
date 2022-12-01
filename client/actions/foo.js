export const foosLoadStartAction = () => {
  return {
    type: 'foos-load-start',
  }
}

export const foosLoadErrorAction = (error) => {
  return {
    error,
    type: 'foos-load-error',
  }
}

export const foosLoadSuccessAction = (foos) => {
  return {
    foos,
    type: 'foos-load-success',
  }
}
