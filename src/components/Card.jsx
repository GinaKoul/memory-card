export default function Card({ id, title, image, handleClick }) {
  return (
    <article id={id} onClick={handleClick}>
      <img src={image === "" ? null : image} alt={title} />
      <h3>{title}</h3>
    </article>
  );
}
