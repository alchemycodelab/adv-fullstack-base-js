export default (className) => {
  const component = (props) => {
    return <a className={className} href={props.url}>
      {props.children}
    </a>
  }
  component.displayName = 'Link'
  return component
}
