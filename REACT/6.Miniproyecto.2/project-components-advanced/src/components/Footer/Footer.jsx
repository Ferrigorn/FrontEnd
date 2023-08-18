import Image from "../Image/Image";
import Subtitle from "../Subtitle/Subtitle";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <Subtitle>Larry on fire</Subtitle>
      <Image
        src={
          "https://res.cloudinary.com/dyyzufpto/image/upload/v1690739681/cartoon-colorful-chameleon-element-png_zyzyoc.webp"
        }
        alt={"Camaleon"}
        width={"100px"}
        height={"100px"}
      />
    </footer>
  );
};

export default Footer;
