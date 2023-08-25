import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../Services/GameOfThrones.service";

const CharacterById = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //cogemos el id de los params de getById

  const [character, setCharacter] = useState(); //creamos un estado para poder setear el character

  useEffect(() => {
    //aquí modificamos el setCharacter con una promesa (realizado con axios NO seria async-await) con la funcion getById con el params(id)

    (async () => {
      setCharacter(await getById(id));
    })();
  }, []);

  return (
    <figure> {/*aquí retornamos la informacion previamente seteada de character que queremos que se nos pinte */}
      {console.log(character)}
      <img src={character?.imageUrl} alt={character?.fullName} />
      <h4>{character?.fullName}</h4>
      <h5>
        {character?.fullName} de la Familia {character?.family}
      </h5>
      <button onClick={() => navigate("/gameofthrones")}> {/*boton para volver a la pagina que le pasemos a navigate */}
        Volver a la Galeria
      </button>
    </figure>
  );
};

export default CharacterById;
