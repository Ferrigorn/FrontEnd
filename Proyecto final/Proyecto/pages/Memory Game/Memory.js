import "./Memory.css";
import JSConfetti from 'js-confetti'


const template = () => ` 
 
  <section class="memory-game">
    <div class="memory-card" id="chili">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/chili_hayj9m.png" alt="Chili"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="chili">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/chili_hayj9m.png" alt="Chili"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="lemon">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/lemon_wvpfww.png" alt="Limon"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="lemon">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/lemon_wvpfww.png" alt="Limon"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="naranja">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/orange_wmqi3n.png" alt="Naranja"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="naranja">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/orange_wmqi3n.png" alt="Naranja"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="uva">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/grapes_yi2nvh.png" alt="Uvas"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="uva">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/grapes_yi2nvh.png" alt="Uvas"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="fresa">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278171/strawberry_wzmkfu.png" alt="Fresa"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="fresa">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278171/strawberry_wzmkfu.png" alt="Fresa"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="piña">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/pineapple_r2w2oj.png" alt="Piña"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
    <div class="memory-card" id="piña">
      <img class="front-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690278186/pineapple_r2w2oj.png" alt="Piña"/>
      <img class="back-face" src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp" alt="Pica"/>
    </div>
  </section>
  <div id="time"></div>`;

let lockBoard = false;
let contador = 0;
let ok = 0;
let segundos;
let intervalo;

const flipCard = (e, card) => {
  if (!lockBoard) {
    card.classList.add("flip");
    const numberFlip = document.querySelectorAll(".flip");
    if (numberFlip.length === 2) {
      lockBoard = true;
      checkForMatch(numberFlip);
    }
  }
};

const checkForMatch = (numberFlip) => {
  contador++;
  let isMatch = numberFlip[0].id === numberFlip[1].id;
  isMatch ? disableCards(numberFlip) : unFlipCards(numberFlip);
};

const disableCards = (numberFlip) => {
  ok++;
  numberFlip[0].removeEventListener("click", flipCard);
  numberFlip[1].removeEventListener("click", flipCard);
  numberFlip[0].classList.add("flipOk");
  numberFlip[1].classList.add("flipOk");
  numberFlip[0].classList.remove("flip");
  numberFlip[1].classList.remove("flip");

  resetBoard();
};

function unFlipCards(numberFlip) {
  lockBoard = true;

  setTimeout(()=>{
    numberFlip[0].classList.remove("flip");
    numberFlip[1].classList.remove("flip");

    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  lockBoard = false;
};


const shuffle = () => {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card) => {
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
  addListeners(cards);
  segundos = 40;
  intervalo = setInterval(time, 1000);
};

const addListeners = (cards) => {
  cards.forEach((card) => 
    card.addEventListener("click", (e) => flipCard(e, card))
  );
};

const time = () => {
  segundos--;
  const containerTime = document.getElementById("time");
  const segundosTime = `<h4>${segundos}</h4>`;
  containerTime.innerHTML = segundosTime;
  checkInterval();
};

const checkInterval = () => {
  if (segundos === 0) {
    clearInterval(intervalo);
    const timer = document.getElementById("time");
    timer.innerHTML = "";
    const memory = document.querySelector(".memory-game");
    const templateEnd = `
    <div class="containerEnd">
    <h1> Juego finalizado</h1>
    <h4>${ok === 6 ? "You Win!" : "Looser, mas que looser!"}</h4>
    <h6>Movimientos: ${contador}</h6>
    <button id="resetButton">REINICIAR</button>
    </div>`;

    if (ok === 6) {
      const jsConfetti = new JSConfetti();

      jsConfetti.addConfetti({
        emojis:["🥳"]
      });
    } else {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis:["💩"]
      })  ;

    }

    memory.innerHTML = "";
    memory.innerHTML = templateEnd;
    const reset = document.querySelector("#resetButton");
    reset.addEventListener("click", () => {
      contador = 0;
      ok = 0;
      segundos = 60;
      document.querySelector("main").innerHTML = template();
      shuffle();
    })
  }
}



export const PrintMemoryPage = () =>{
  document.querySelector("main").innerHTML = template();
  shuffle();
};


