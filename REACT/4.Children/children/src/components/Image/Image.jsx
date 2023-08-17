import "./Image.css"


//con destructuring de props

const Image = ({src, alt, width, height}) => {
    return (
      <img src={src} alt={alt} width={width} height={height}/>
    );
  };


  // SIN DESTRUCTURING DE PROPS  

  // const Image = (props) => {
  //   return (
  //     <img src={props.src} alt={props.alt} width={props.width} height={props.height}
  //   )
  // }
  
  export default Image;