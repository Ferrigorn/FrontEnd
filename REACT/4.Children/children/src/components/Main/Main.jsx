import Image from "../Image/Image";
import Paragraph from "../Paragraph/Paragraph";
import "./Main.css";

const Main = () => {
  return (
    <main>
      <Image src={"https://res.cloudinary.com/dyyzufpto/image/upload/v1690739681/cartoon-colorful-chameleon-element-png_zyzyoc.webp"}
        alt={"Camaleon"}
        width={"400px"}
        height={"400px"}/>
        <Paragraph>El bonito y escurridizo camaleón, con su característico cambio de color</Paragraph>
        <Paragraph>El cambio de color despista a los depredadores</Paragraph>
    </main>
  );
};

export default Main;
