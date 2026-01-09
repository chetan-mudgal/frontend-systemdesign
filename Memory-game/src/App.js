import { useEffect, useState } from "react";

export default function App() {
  const size = 4;
  const [turn, setTurn] = useState([]);
  const [game, setGame] = useState(false);
  const [cards, setCards] = useState(
    getRandom(size).map((item, index) => ({
      id: index,
      state: 0, // 0 -> hidden, 1-> revealed,
      value: item,
    }))
  );
  function getRandom(n) {
    let arr = new Array((n * n) / 2).fill(0).map((_, index) => index + 1);
    arr = [...arr, ...arr];

    // shuffle the elements of the array
    for (let i = n * n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random pick from 0, to i;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap them
    }
    return arr;
  }

  function revealCard(index) {
    if (cards[index].state === 0 && turn.length < 2) {
      setCards((prev) =>
        prev.map((item) => {
          if (item.id === index) {
            return {
              ...item,
              state: 1,
            };
          }
          return item;
        })
      );
      setTurn((prev) => {
        let newArr = [...prev];
        newArr.push(index);
        return newArr;
      });
    }
  }

  function evaluateGame() {
    if (cards[turn[0]].value !== cards[turn[1]].value) {
      const timeoutId = setTimeout(() => {
        setCards((prev) =>
          prev.map((item) => {
            if (item.id === turn[0] || item.id === turn[1]) {
              return { ...item, state: 0 };
            }
            return item;
          })
        );
        setTurn([]);
        clearTimeout(timeoutId);
      }, 3000);
    } else {
      setTurn([]);
    }
  }

  useEffect(() => {
    console.log("yes1", turn.length);

    if (turn.length === 2) {
      console.log("yes", turn.length);
      evaluateGame();
      if (cards.every((card) => card.state === 1)) {
        setGame(true);
      }
    }
  }, [turn]);
  return (
    <div className="container">
      <h1>Memory game</h1>
      <div
        className="grid-wrapper"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 80px)`,
          rowGap: "10px",
          columnGap: "10px",
        }}
      >
        {cards.map((card, index) => (
          <div className="grid-item" onClick={() => revealCard(index)}>
            {card.state !== 0 ? card.value : "?"}
          </div>
        ))}
      </div>
      {game && <div>Game done!</div>}
    </div>
  );
}

/**
 * n*n matrix n>3
 * 1 to n, randomly assigned values
 * Each box has a Number, Id and State => hiden, shown
 *
 *
 */
