import "./quiz.css"

const template = () => `
<div class="quizgame">
  <div class="inicio">
    <h1>Quiz</h1>
    <!-- <button class="empezar">Inicio</button> -->
  </div>
  <div class="question">
    <section id="p1">
      <h2>¿En qué año empezó la Segunda Guerra Mundial?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p1" />1939
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p1" />1942
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p1" />1830
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p1" />Nunca empezó
      </label>
    </section>
    <section id="p2">
      <h2>¿Cuál es la montaña más alta del mundo?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p2" />Teide
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p2" />Kilimanjaro
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p2" />Everest
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p2" />McKenzie
      </label>
    </section>
    <section id="p3">
      <h2>¿Cuál es el país más grande del mundo?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p3" />China
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p3" />Kazajastán
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p3" />Rusia
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p3" />Mónaco
      </label>
    </section>
    <section id="p4">
      <h2>¿En qué año cayó el Imperio Romano de Oriente (Bizancio)?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p4" />1845
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p4" />1463
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p4" />1789
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p4" />Aún no ha
        caído
      </label>
    </section>
    <section id="p5">
      <h2>¿En qué año pisó el ser humano la Luna?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p5" />2010
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p5" />1968
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p5" />Nunca la ha
        pisado
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p5" />1969
      </label>
    </section>
    <section id="p6">
      <h2>¿Qué exclamó Arquímedes al descubrir su famoso Principio?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p6" />¡Eureka!
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p6" />¡Soy el mejor!
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p6" />¡Bingo!
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p6" />¡Lo vais a
        flipar!
      </label>
    </section>
    <section id="p7">
      <h2>¿Cuál es el continente de mayor tamaño?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p7" />América
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p7" />Asia
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p7" />Europa
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p7" />Continente
        Contrapeso
      </label>
    </section>
    <section id="p8">
      <h2>¿Quién esculpió la "Pietà"</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p8" />Donatello
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p8" />Rafael Sancti
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p8" />Miguel Ángel
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p8" />Una tortuga
        ninja
      </label>
    </section>
    <section id="p9">
      <h2>¿Quién escribió La Insoportable Levedad del Ser?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p9" />Milan Kundera
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p9" />Miguel de
        Cervantes
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p9" />Éste libro no
        existe
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p9" />Emily Bronte
      </label>
    </section>
    <section id="p10">
      <h2>¿Quién fue el máximo repesentante del anarquismo?</h2>
      <label>
        <input class="entrada" type="radio" value="1" name="p10" /> Kropotkin
      </label>
      <label>
        <input class="entrada" type="radio" value="2" name="p10" />Marx
      </label>
      <label>
        <input class="entrada" type="radio" value="3" name="p10" />Bakunin
      </label>
      <label>
        <input class="entrada" type="radio" value="4" name="p10" />PunkyMan
      </label>
    </section>
  </div>
  <button id="botonResultado">RESULTADO</button>
  <h2>Has acertado: <span id="correctas"></span></h2>
</div> `;

let respuestaOk = [1, 3, 3, 2, 4, 1, 2, 3, 1, 3];

const addListeners = () => {
  const buttonRes = document.getElementById("botonResultado");
  buttonRes.addEventListener("click", ()=>{
    const preguntas = document.querySelectorAll("section");
    const respuestasUser = [];
    preguntas.forEach((pregunta, i)=>{
      const inputs = pregunta.querySelectorAll("input");
      inputs.forEach((input) => {
        if (input.checked && Number(input.value) === respuestaOk[i]) {
          respuestasUser.push("correcto");
        }
      })
    })
    
    document.getElementById("correctas").innerHTML = respuestasUser.length;
  })
};

export const PrintQuizGame = () => {
  document.querySelector("main").innerHTML = template();
  addListeners();
};
