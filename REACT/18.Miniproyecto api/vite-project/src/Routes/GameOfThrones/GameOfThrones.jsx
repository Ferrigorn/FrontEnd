import { useEffect, useState } from "react";
import { getAll } from "../../Services/GameOfThrones.service";
import { Link } from "react-router-dom";

const GameOfThrones = () => {
  const [character, setCharacter] = useState(); //creamos una funcion para poder settear la informacion que nos hemos fetcheado de la pagina

  useEffect(() => { // setteamos la data obtenida de getAll (es asincrona porque la obtenemos a traves de un fetching) y instnciamos la funcion (getData)
    const getData = async () => {
      const data = await getAll();
      setCharacter(data);
    };
    getData();
    console.log(character);
  }, []);
  
  //mapeamos la informacion getteada y setteada y la pintamos como queramos
  return (  
      <div>
        {character &&
          character.map((element)  => (
            <ul key={element.id}>
              <li key={element.id}>
                <h3>Nombre: {element.fullName}</h3>
              </li>
              <li >
                <h4>Familia: {element.family}</h4>
              </li>
              <li >
               <Link to={`/gameofthrones/character/${element.id}`}> <img
                  src={element.imageUrl}
                  alt={element.fullName}
                  width={"200px"}
                  height={"200px"}
                /></Link>
              </li>
            </ul>
          ))}
      </div>

  );
};

export default GameOfThrones;
