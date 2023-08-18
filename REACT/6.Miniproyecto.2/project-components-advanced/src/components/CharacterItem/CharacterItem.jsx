import "./CharacterItem.css";

const CharacterItem = (props) => {
  const { character } = props;
  return (
    <li key={character.id}>
      <h2>Id: {character.id}</h2>
      <h3>Nombre: {character.name}</h3>
      <img className="image" src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
    </li>
  );
};

export default CharacterItem;
