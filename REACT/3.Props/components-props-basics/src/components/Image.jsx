import "./Image.css";

const Image = ({ src, alt, width, height }) => {
  return (
    <img
      className="imagen"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Image;
