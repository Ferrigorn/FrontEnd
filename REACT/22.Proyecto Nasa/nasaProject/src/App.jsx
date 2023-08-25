import axios from "axios";
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Figure from "./components/Figure";



const App = () => {
  const today = new Date(Date.now()).toISOString().slice(0, 10); //para establecer la fecha actual en formato ISO y selecciona los 10 primeros numeros

  const [apod, setApod] = useState({});

  const [date, setDate] = useState(today);

  const NASA_URL = "https://api.nasa.gov/";

  const NASA_API_KEY = "aAh88S2tGgdow9p7kS7MrRBnfQN4X29XysKSuebK";

  useEffect(() => {
    const getApod = async () => {
      const data = await axios.get(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}` //extraemos la información de la página
      );
      setApod(data.data); //seteamos la data dentro de setApod
    };
    getApod();
  }, [date]); //En el array de dependencias le comunicamos que no relanze el useEffect hasta que cambie date

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString());
  };

  return (
    <div className="App">
      <h2 className="title">
         <img src={"https://res.cloudinary.com/dyyzufpto/image/upload/v1692802633/Awesome-Tie-Dye-nasa-logo-shirt-hippie-nasa-shirt-gift-idea-Pullover-Hoodie-B08FT3B4P1_wto9zi.png"} className="logo" alt="NASA logo" />
         API
      </h2>
      <h1>Astronomy Picture Of The Day</h1>
      <input type="date" id="photo-date" onChange={handleInput} />{" "}
      {/*input para seleccionar la fecha*/}
      {/*ternario para que si la fecha no es correcta (futuro) nos diga que seleccionemos otra, y si lo es, pintarnos la figure con la foto del dia*/}
      {date > today ? (
        <h2>Por favor selecciona una data previa al dia de hoy</h2>
      ) : (
        <Figure data={apod} />
      )}
      <div className="standar-dialog center">
        <h3 className="dialog-text">
          @lethamburn - 2023 -{" "}
          <a href="https://api.nasa.gov">https://api.nasa.gov</a>
        </h3>
      </div>
    </div>
  );
};

export default App;
