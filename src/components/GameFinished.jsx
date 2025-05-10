import "../styles/GameFinished.css";

export default function GameFinished({ handleRestart }) {
  return (
    <section className="game-finished">
      <h1>Harry Potter Memory Game</h1>
      <p>Congratulations you remembered all the cards!</p>
      <button onClick={handleRestart}>Play again</button>
    </section>
  );
}
