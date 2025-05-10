export default function ScoreBoard({ bestScore, currentScore }) {
  return (
    <section>
      <h2>Score Board</h2>
      <p>Best score: {bestScore}</p>
      <p>Current Score: {currentScore}</p>
    </section>
  );
}
