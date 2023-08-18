import React from "react"
import CharacterItem from "../CharacterItem/CharacterItem"
import "./CharacterList.css"


const CharacterList = () => {
    const [characterList, setCharacterList] = React.useState([])

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
              <ul><CharacterItem character={character}></CharacterItem></ul>)
          )}
        </>
      );

}

export default CharacterList