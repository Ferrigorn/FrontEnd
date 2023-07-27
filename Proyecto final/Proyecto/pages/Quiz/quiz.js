//https://opentdb.com/api.php?amount=10&type=multiple

const template = () => `
  <div class="inicio">
    <h1>Quiz</h1>
    <button class="empezar"></button>
  </div>
  <div class="question">
    <div class="score"></div>
  </div>
`;

let contador;
let preguntas;

export const PrintQuizGame = () => {
  document.querySelector("main").innerHTML = template();
};
