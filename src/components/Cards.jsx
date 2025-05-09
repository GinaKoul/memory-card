function shuffle(max) {
  return Math.floor(Math.random() * max);
}

export default function Cards() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  shuffle();
}
