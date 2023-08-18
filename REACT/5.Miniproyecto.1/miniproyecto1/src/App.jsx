import React from "react";
import "./App.css";

const App = () => {
  const [characterList, setCharacterList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      let data = await fetch(`https://rickandmortyapi.com/api/character/`).then(
        (res) => res.json()
      );

      setCharacterList(data.results);
    })();
  }, []);

  return (
    <>
      {characterList.map(
        (character) =>
          character.status == "Alive" && (
            <div className="personaje" key={character.id}>
              <h2 className="nombre">Nombre: {character.name}</h2>
              <img className="image" src={character.image} alt={character.name} />
              <h2 className="status"><span className="span">Status:</span> {character.status}</h2>
              <h2 className="origin"><span className="span">Origin:</span> {character.origin.name}</h2>
            </div>
          )
      )}
    </>
  );
};

export default App;
