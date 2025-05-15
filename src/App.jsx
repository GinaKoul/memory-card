import "./App.css";
import { useState, useEffect } from "react";
import Cards from "./components/Cards.jsx";
import Card from "./components/Card.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import GameFinished from "./components/GameFinished.jsx";

function shuffle(currentArray, selectedArray) {
  const max = currentArray.length;
  let selected = 0;
  let newOrder = [];
  let newArray = [];
  while (newOrder.length < 8) {
    const randomNum = Math.floor(Math.random() * max);
    if (!newOrder.includes(randomNum)) {
      const isSelected = selectedArray.includes(currentArray[randomNum].id);
      if (isSelected && selected >= 7) continue;
      if (isSelected) selected += 1;
      newOrder.push(randomNum);
      newArray.push(currentArray[randomNum]);
      selectedArray.includes(currentArray[randomNum]) && selected++;
    }
  }

  return newArray;
}

function App() {
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentScore = selectedCards.length;

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetch("https://hp-api.onrender.com/api/characters")
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((data) => {
          if (!ignore) {
            let newData = [];
            let hasImageCount = 0;
            for (let index = 0; index < data.length; index++) {
              if (data[index].image == "") continue;
              newData.push(data[index]);
              hasImageCount++;
              if (hasImageCount >= 25) break;
            }
            setData(newData);
          }
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }

    return () => (ignore = true);
  }, []);

  useEffect(() => {
    data.length > 0 && setVisibleData(shuffle(data, selectedCards));
    return () => setVisibleData([]);
  }, [selectedCards, data]);

  function handleClick(e) {
    const currentId = e.target.getAttribute("id");
    if (selectedCards.includes(currentId)) {
      if (currentScore > bestScore) setBestScore(currentScore);
      setSelectedCards([]);
    } else if (currentScore >= data.length - 1) {
      setGameFinished(true);
    } else {
      setSelectedCards([...selectedCards, currentId]);
    }
  }

  function handleKeyDown(e) {
    e.code === "Enter" && handleClick(e);
  }

  function handleRestart() {
    setBestScore(0);
    setSelectedCards([]);
    setGameFinished(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  if (gameFinished) {
    return <GameFinished handleRestart={handleRestart} />;
  }

  return (
    <>
      <main>
        <div className="game-top">
          <h1>Harry Potter Memory Game</h1>
          <ScoreBoard bestScore={bestScore} currentScore={currentScore} />
        </div>
        <Cards>
          {visibleData.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                title={card.name}
                image={card.image}
                handleClick={handleClick}
                handleKeyDown={handleKeyDown}
              ></Card>
            );
          })}
        </Cards>
      </main>
      <footer>&copy; Gina Kouliaki</footer>
    </>
  );
}
export default App;
