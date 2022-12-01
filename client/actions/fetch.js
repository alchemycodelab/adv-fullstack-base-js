export const fetchStartAction = () => {
  return {
    type: 'fetch-start',
  }
}

export const fetchErrorAction = () => {
  return {
    type: 'fetch-error',
  }
}

export const fetchSuccessAction = (data) => {
  return {
    data,
    type: 'fetch-success',
  }
}
