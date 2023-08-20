import HeroeDetail from "../../components/HeroeDetail/HeroeDetail";
import { getHeroes } from "../../data/data";
import "./Heroes.css";
import { Link, Outlet } from "react-router-dom";

const Heroes = () => {
  const heroes = getHeroes(); //cogemos la informacion de la data
  return (
    <>
      <div>
        <h1>Superheroes</h1>
        <ul>
          {heroes.map((heroe) => ( //mapeamos la data para extraer la informacion de cada elemento
          /* Link nos redirecciona a la ruta, establecida o creada en el main*/
            <li key={heroe.id}> 
              <Link to={`/heroes/heroe/${heroe.id}`}> 
                <HeroeDetail heroe={heroe} /> 
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet /> 
    </>
  );
};

export default Heroes;
