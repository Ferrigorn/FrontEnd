import { initController } from "../../utils";
import "./dashboard.css";

const template = () => `
  <div id="containerDashboard">
    <ul>
      <li>
        <figure id="navPokemon">
          <img src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690019214/Pokemon-Transparent-Images_yxoz2j.png" alt="go to page Pokemon" />
          <h2>POKEMON</h2>
        </figure>
      </li>
      <li>
        <figure id="navMemory">
          <img src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690274789/memory-game-icon_f9zza3.png" alt="go to Game Memory" />
          <h2>MEMORY</h2>
        </figure>
      </li>
      <li>
        <figure>
          <img src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690407451/Pq8tK2uaRpS7URF_o0ctsx.webp" alt="go to Game Quiz" />
          <h2>Joc2</h2>
        </figure>
      </li>
    </ul>
  </div>
`;

const addEventListeners =()=>{
  const navPokemon = document.getElementById("navPokemon");
  navPokemon.addEventListener("click", ()=>{
    initController("Pokemon")
  })
  const navMemory = document.getElementById("navMemory");
  navMemory.addEventListener("click", ()=>{
    initController("Memory")
  })
}

export const printTemplateDashboard = () => {
  document.querySelector("main").innerHTML = template();
  addEventListeners()
};
