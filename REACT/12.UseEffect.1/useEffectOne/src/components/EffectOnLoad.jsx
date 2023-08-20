import { useState } from "react";
import "./EffectOnLoad.css";
import { useEffect } from "react";

const EffectOnLoad = () => {
  const [myName, setMyName] = useState("Larry");

  //   useEffect(() => {
  //     setMyName("Larry Molongui");
  //   }, []); // el valor entre corchetes [array de dependencias] indica cuando se renderizara nuestro codigo, con los corchetes vacios solo se renderizarauna vez

  //   useEffect(() => {
  //     setMyName("Larry Molongui");
  //   }, [myName]); //En este ejemplo, pasandole el get que ya se ha setteado, no permite el cambio en la pagina

  //   useEffect(() => {
  //     setMyName("Larry Molongui");
  //   })

  useEffect(() => {
    setTimeout(() => {
      setMyName("Larry Molongui");
    }, 1500); //con el settimeout tarda a renderizar el valor inicial de usestate el tiempo que le hayamos dicho
  }, []);
  return (
    <>
      <h4>{myName}</h4>
      <input
        type="text"
        value={myName} //valor predeterminado, no se modifica
        onChange={(e) => setMyName(e.target.value)} //valor que se le asigna, es el que puede modificarse
      />
    </>
  );
};

export default EffectOnLoad;
