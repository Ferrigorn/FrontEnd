import { useState } from "react";

import "./App.css";
import Movie from "./components/Movie";
import Review from "./components/Review";

const App = () => {
  const [score, setScore] = useState(0);

  return (
    <>
      <div className="App">
        <Movie
          title="Que hacer en caso de incendio"
          poster="https://es.web.img3.acsta.net/medias/nmedia/18/89/99/93/20076363.jpg"
        />
        <hr />

        <label>Cambia tu puntuacion: </label>
        <br />
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.valueAsNumber)}
        />
        <Review title="Pelicula para pensar" score={score} />
      </div>
    </>
  );
};

export default App;
