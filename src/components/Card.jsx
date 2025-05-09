export default function Card({ title, image }) {
  return (
    <article>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </article>
  );
}
