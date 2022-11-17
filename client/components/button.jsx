export default (className) => {
  const component = (props) => {
    return <button
      className={className}
      data-testid={props.dataTestId}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  }
  component.displayName = 'Button'
  return component
}
