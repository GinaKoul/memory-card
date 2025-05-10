import { useState, useEffect } from "react";
import Card from "./Card";

function shuffle(currentArray) {
  const max = 40;
  let newOrder = [];
  let newArray = [];
  while (newOrder.length < 8) {
    const randomNum = Math.floor(Math.random() * max);
    if (!newOrder.includes(randomNum)) {
      newOrder.push(randomNum);
      newArray.push(currentArray[randomNum]);
    }
  }

  return newArray;
}

export default function Cards() {
  const [data, setData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  const visibleData = data.length > 0 ? shuffle(data) : [];
  const currentScore = selectedCards.length;

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((response) => response.json())
      .then((data) => {
        const newData = data.slice(0, 40);
        setData(newData);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleClick(e) {
    console.log(e.target);
    const currentId = e.target.getAttribute("id");
    console.log(currentId);
    if (selectedCards.includes(currentId)) {
      if (currentScore > bestScore) setBestScore(currentScore);
      setSelectedCards([]);
    } else {
      setSelectedCards([...selectedCards, currentId]);
    }
  }

  if (currentScore >= 41) {
    return <p>Congratulations you won!</p>;
  }

  return (
    <>
      <p>Best score: {bestScore}</p>
      <p>Current Score: {currentScore}</p>
      <article>
        {visibleData.map((card) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              title={card.name}
              image={card.image}
              handleClick={handleClick}
            ></Card>
          );
        })}
      </article>
    </>
  );
}
