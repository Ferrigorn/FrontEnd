import React from "react";


const Movie = React.memo(({title, poster}) => { //El react.memo para que no renderize auqellos elementos que no cambien. Envuelve a todo el componente => (componente)
    console.log("renderizando Movie...");
  return (
    <div>
        <h3>{title}</h3>
        <img src={poster} alt={title} width={"200px"}/>
    </div>
  )
})

export default Movie