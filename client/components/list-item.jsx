export default (className) => {
  const component = (props) => {
    return <li className={className}>
      {props.children}
    </li>
  }
  component.displayName = 'ListItem'
  return component
}
