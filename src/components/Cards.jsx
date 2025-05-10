import "../styles/Cards.css";

export default function Cards({ children }) {
  return (
    <section>
      <h2>Character Cards</h2>
      <p>Select a card. A card should not be selected more than once!</p>
      <div className="cards">{children}</div>
    </section>
  );
}
