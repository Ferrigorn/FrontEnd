import { ImagenesMemory } from "../../Data/MemoryData";
import "./CardMemory.css";

const RandomCard = () => {
  const dataMemory = ImagenesMemory();
  dataMemory.sort(() => Math.random() - 0.5);
  return dataMemory;
};


export const CardMemory = () => {
  const gridContainer = document.getElementById("gridContainer");
  const dataRandom = RandomCard();
  dataRandom.forEach((element) => {
    const contenedorCard = document.createElement("div");
    const cardFace = document.createElement("img");
    const cardBack = document.createElement("img");
    contenedorCard.classList = "ContainerCard";
    cardBack.classList = "BackCard";
    cardFace.classList = "FaceCard";
    cardFace.src = element.src;
    cardFace.alt = element.alt;
    gridContainer.appendChild(contenedorCard);
    contenedorCard.appendChild(cardFace);
    contenedorCard.appendChild(cardBack);
    cardBack.src = "https://res.cloudinary.com/dyyzufpto/image/upload/v1690299410/why-bicycle-3-U7Y3JI45_cmjqgc.webp"
    cardBack.alt = "BackCard"
  });
 
};
