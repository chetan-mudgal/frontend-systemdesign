import { useEffect, useState } from "react";

const SIZE = 20;
// Array.from creates independent arrays; Array.fill would create references to the same array
const GRID = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
const dirs = [
  [-1, 0], // UP
  [1, 0], // DOWN
  [0, -1], // LEFT
  [0, 1], // RIGHT
];

const DIRECTIONS = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};
export default function App() {
  const [snake, setSnake] = useState([
    [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)],
  ]);
  const [food, setFood] = useState([15, 13]);
  const [dir, setDir] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setSnake([
      [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)],
    ]);
    setFood([15, 13]);
    setDir(0);
    setGameOver(false);
  };

  // Keep generating random positions until we find one not occupied by snake
  const generateFood = (snake) => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * SIZE),
        Math.floor(Math.random() * SIZE),
      ];
    } while (snake.some((s) => s[0] === newFood[0] && s[1] === newFood[1]));
    return newFood;
  };

  // Attach keyboard listener once on mount, cleanup on unmount
  useEffect(() => {
    function handleKeyDown(e) {
      const dirMap = {
        ArrowUp: DIRECTIONS.UP,
        ArrowDown: DIRECTIONS.DOWN,
        ArrowLeft: DIRECTIONS.LEFT,
        ArrowRight: DIRECTIONS.RIGHT,
      };

      const newDir = dirMap[e.key];
      if (newDir === undefined) return;

      setDir((prev) => {
        // Block opposite direction to prevent snake reversing into itself
        const opposites = { 0: 1, 1: 0, 2: 3, 3: 2 };
        return opposites[newDir] === prev ? prev : newDir;
      });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Game loop: move snake every 100ms, restart when dir/food changes
  useEffect(() => {
    if (gameOver === true) {
      return;
    }
    const interval = setInterval(() => {
      setSnake((prev) => {
        // Calculate next head position
        let newX = prev[0][0] + dirs[dir][0];
        let newY = prev[0][1] + dirs[dir][1];

        // Wall collision
        if (newX < 0 || newX >= SIZE || newY < 0 || newY >= SIZE) {
          setGameOver(true);
          setTimeout(() => alert("Game Over! You hit the wall!"), 10);
          return [
            [
              Math.floor(Math.random() * SIZE),
              Math.floor(Math.random() * SIZE),
            ],
          ];
        }

        // Self collision
        if (prev.some((it) => it[0] === newX && it[1] === newY)) {
          setGameOver(true);
          setTimeout(() => alert("Game Over! You hit yourself!"), 10);
          return prev;
        }

        // Food collision: grow by not removing tail
        const ateFood = newX === food[0] && newY === food[1];
        if (ateFood) {
          setFood(generateFood([...prev, [newX, newY]]));
          return [[newX, newY], ...prev];
        }

        // Normal move: add head, remove tail
        return [[newX, newY], ...prev.slice(0, prev.length - 1)];
      });
    }, 100);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <div className="container">
      <h1>Snake Game</h1>
      <div style={{ marginBottom: "10px" }}>
        {gameOver && (
          <button onClick={resetGame} style={{ marginLeft: "20px" }}>
            Restart Game
          </button>
        )}
      </div>
      <div className="grid">
        {GRID.map((arr, i) =>
          arr.map((_, j) => {
            if (i === food[0] && j === food[1]) {
              return <div key={`${i}-${j}`} className="food"></div>;
            } else if (snake.some((sn) => i === sn[0] && j === sn[1])) {
              return <div key={`${i}-${j}`} className="snake"></div>;
            }
            return <div key={`${i}-${j}`} className="grid-item"></div>;
          })
        )}
      </div>
    </div>
  );
}
