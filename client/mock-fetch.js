
export const mockFetch = (status, body) => {
  global.fetch = jest.fn((..._args) => {
    return (Promise.resolve({
      status: status,
      json: () => {
        return Promise.resolve(body)
      },
    }))
  })
}
