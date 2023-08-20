import "./HeroeDetail.css";

import React from "react";

//Los parametros que se renderizaran "salidos" del destructuring del elemento entre llaves, elemento individual del .map()
const HeroeDetail = ({ heroe }) => {
  return (
    <>
      <h1>name: {heroe.name}</h1>
      <p>alias: {heroe.alias}</p>
      <p>age: {heroe.age}</p>
    </>
  );
};

export default HeroeDetail;
