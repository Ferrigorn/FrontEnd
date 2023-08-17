import "./App.css";
import Image from "./components/Image";
import Paragraph from "./components/Paragraph";
import Subtitle from "./components/Subtitle";
import Title from "./components/Title";

const App = () => {
  const titulo = "Este es el título:";
  const subtitle = "Aquí va un subtítulo";
  const parrafo =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus facilis amet tempore doloremque dignissimos omnis eligendi cupiditate dolor quasi aliquam! Aperiam error porro architecto alias iure deleniti blanditiis neque minima!";
  

  return (
    <>
      <div className="App">
        <Title titulo={titulo} />
        <Subtitle subtitle={subtitle} />
        <Image
          src={"https://res.cloudinary.com/dyyzufpto/image/upload/v1691679472/BootCamp/2746586_wq1p6s.png"}
          alt={"dolor!!"}
          width={"200px"}
          height={"200px"}
        />
        <Paragraph parrafo={parrafo}/>
      </div>
    </>
  );
};

export default App;
