import "./Title.css"


const Title = (props) => {
  return (
    <h1 className="titulo">{props.children}</h1>
  )
}

export default Title