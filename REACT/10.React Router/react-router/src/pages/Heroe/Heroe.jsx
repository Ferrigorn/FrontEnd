import { useNavigate, useParams } from "react-router-dom";
import HeroeDetail from "../../components/HeroeDetail/HeroeDetail";
import { deleteHeroe, getHeroe } from "../../data/data";
import "./Heroe.css";

const Heroe = () => {
  const params = useParams(); //los params que necesita para la ruta
  const navigate = useNavigate(); //nos redirige a la ruta seleccionada
  const heroe = getHeroe(params.id);

  if (!heroe) return <p>Este Superheroe no lo tenemos 😣</p>;

  return (
    <div>
      <h1>Superheroes</h1>
      <HeroeDetail heroe={heroe} />
      <button
        onClick={() => {
          deleteHeroe(heroe.id).then(() => {
            navigate("/heroes");
          });
        }}
      >
        Quita a {heroe.name} de mi vista!
      </button>
    </div>
  );
};

export default Heroe;
