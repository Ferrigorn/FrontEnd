import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Figure from "./components/Figure";

function App() {
  const [hour, setHour] = useState(6);
  const array = [
    {
      title: "El camino de los reyes",
      author: "Brandon Sanderson",
    },
    {
      title: "Guerra y paz",
      author: "Lev Tolstoi",
    },
    {
      title: "Cumbres borrascosas",
      author: "Emily Bronte",
    },
  ];

  let modoColor = false

  return (
    <>
      <div>
        <input type={Number} onChange={(e) => setHour(e.target.value)}></input>
        {hour >= 6 && hour <= 12 ? (
          <p>Buenos dias</p>
        ) : hour > 12 && hour < 20 ? (
          <p>Buenas Tardes</p>
        ) : (
          <p>Buenas noches</p>
        )}
      </div>

      <div>
        {array.map((item, index) => (
          <Figure title={item.title} author={item.author} />
        ))}
      </div>

      <button
        onClick={() => {
          modoColor
            ? ((document.querySelector("body").style.background = "blue"),
              (modoColor = false))
            : ((document.querySelector("body").style.background = "white"),
              (modoColor = true))
        }}
      >
        {" "}
        Color Background{" "}
      </button>
    </>
  );
}

export default App;
