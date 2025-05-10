import "../styles/Card.css";
import noImage from "../assets/no-image.svg";

export default function Card({ id, title, image, handleClick, handleKeyDown }) {
  return (
    <article
      id={id}
      className="card"
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="img-holder">
        <img src={image === "" ? noImage : image} alt="" />
      </div>
      <h3>{title}</h3>
    </article>
  );
}
