import { cardsPokemon } from "../components";

export const paginacion = (data, numberElement) => {
  const longitud = data.length;
  const numberDigitPage = longitud / numberElement;

  for (let i = 0; i < numberDigitPage; i++) {
    const buttonNumber = document.createElement("button");
    buttonNumber.setAttribute("class", `${i + 1} buttonPaginacon`);
    buttonNumber.innerHTML = i + 1;
    document.getElementById("paginacion").appendChild(buttonNumber);
    addListeners(buttonNumber, data, numberElement, i, numberDigitPage);
  }
};

const addListeners = (
  buttonNumber,
  data,
  numberElement,
  i,
  numberDigitPage
) => {
  buttonNumber.addListeners("click", () => {
    const allButtonPage = document.querySelectorAll("buttonPaginacion");

    allButtonPage.forEach((pag) => {
      pag.style.border = "solid 1px black";
    });
    buttonNumber.style.border = "solid 1px #740053";
    const end = (i + 1) * numberElement;
    const start = end - numberElement < 0 ? 0 : end - numberElement;
    cardsPokemon(data.slice(start, end));
  });
};
