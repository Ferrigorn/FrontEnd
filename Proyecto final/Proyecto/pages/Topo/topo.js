import "./topo.css";

const template = () => `
  <div class="container">
    <h1>Puntuacion<span class="score">0</span></h1>
    

    <div class="topogrid">
      <div class="hole" id="1"></div>
      <div class="hole" id="2"></div>
      <div class="hole" id="3"></div>
      <div class="hole mole" id="4"></div>
      <div class="hole" id="5"></div>
      <div class="hole" id="6"></div>
      <div class="hole" id="7"></div>
      <div class="hole" id="8"></div>
      <div class="hole" id="9"></div>
    </div>
    <h2>Tiempo restante <span class="time">60</span></h2>
  </div>
 `;

//  const holes = document.querySelectorAll(".hole");

//  let score = document.querySelector(".score");
//  let time = document.querySelector(".time");

//  let timer = 60;
//  let hitPosition;
//  let resultado = 0;

// const addListeners = ()=>{
//  function randomMove() {
//    holes.forEach((square) => square.classList.remove(".mole"));

//    let randomPosition = holes[Math.floor(Math.random() * 9)];
//    randomPosition.classList.add(".mole");
//    hitPosition = randomPosition.id
//  }

//  let interval = setInterval(randomMove, 1000)

//  holes.forEach(square=>square.addEventListener("click", ()=>{
//    if(square.id === hitPosition) {
//      resultado++;
//      score.textContent = resultado
      
//    }
//  }))

// function gameTimer() {
//   timer--;
//   time.textContent = timer;
//   if(timer === 0) {
//     alert("GAME OVER");
//     clearInterval(interval);
//     clearInterval(gameTimer)
//   }
  
// }

// setInterval(gameTimer, 1000);
// }

export const PrintTopoPage = () => {
  document.querySelector("main").innerHTML = template();
  addListeners();
};
