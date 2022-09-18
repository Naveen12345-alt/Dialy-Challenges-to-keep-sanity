import { useEffect, useState } from "react";
import { initialState, emptyRows, getRandom, increaseSpeed } from "../utils";
import { HEIGHT, WIDTH, LEFT, UP, RIGHT, DOWN, STOP } from "../constants";

const SnakeGame = () => {
  const [game, setGame] = useState(initialState);
  const displayRows = () =>
    game.rows.map((row, i) =>
      row.map((value, j) => <div key={`${i}=${j}`} className={value} />)
    );

  useEffect(() => {
    const timer = setInterval(() => moveSnake(), game.speed);

    document.onkeydown = changeDirection;
    document.title = "snake-game";

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    isCollapsed(game);
    isEaten(game);
  }, [game]);

  const moveSnake = () => {
    setGame((prev) => {
      let snakeCopy = [...prev.snake];
      let head = { ...snakeCopy[snakeCopy.length - 1] };
      switch (prev.direction) {
        case LEFT:
          head.y += -1;
          break;
        case UP:
          head.x += -1;
          break;
        case RIGHT:
          head.y += 1;
          break;
        case DOWN:
          head.x += 1;
          break;
        default:
          return;
      }
      /* keep the value within range of 0 to HEIGHT */
      head.x += HEIGHT * ((head.x < 0) - (head.x >= HEIGHT));
      head.y += WIDTH * ((head.y < 0) - (head.y >= WIDTH));

      snakeCopy.push(head);
      snakeCopy.shift();
      return { ...prev, snake: snakeCopy, head: head };
    });
    update();
  };

  function isEaten(prev) {
    let snakeCopy = [...game.snake];
    let head = { ...snakeCopy[snakeCopy.length - 1] };
    let food = game.food;
    if (head.x === food.x && head.y === food.y) {
      snakeCopy.push(head);
      setGame((prev) => {
        return {
          ...prev,
          snake: snakeCopy,
          food: getRandom(),
          speed: increaseSpeed(game.speed),
        };
      });
    }
  }

  function update() {
    setGame((prev) => {
      let newRows = emptyRows();
      prev.snake.forEach(
        (element) => (newRows[element.x][element.y] = "snake")
      );
      newRows[prev.food.x][prev.food.y] = "food";
      return { ...prev, rows: newRows };
    });
  }

  const isCollapsed = (game) => {
    let snake = game.snake;
    let head = { ...snake[snake.length - 1] };
    for (let i = 0; i < snake.length - 3; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGame(initialState);
        alert(`game over: ${snake.length * 10}`);
      }
    }
  };

  const changeDirection = ({ keyCode }) => {
    setGame((prev) => {
      let direction = prev.direction;
      switch (keyCode) {
        case LEFT:
          direction = direction === RIGHT ? RIGHT : LEFT;
          break;
        case RIGHT:
          direction = direction === LEFT ? LEFT : RIGHT;
          break;
        case UP:
          direction = direction === DOWN ? DOWN : UP;
          break;
        case DOWN:
          direction = direction === UP ? UP : DOWN;
          break;
        case STOP:
          direction = STOP;
          break;
        default:
          break;
      }
      return { ...prev, direction: direction };
    });
  };

  return (
    <div className="a">
      <h1> Snake v0.1.1</h1>
      <ul>
        <li>press "space" to pause the game.</li>
        <li>press "arrow keys" to change direction/ unpause.</li>
      </ul>
      <div className="snake-container">
        <div className="grid">{displayRows()}</div>
      </div>
    </div>
  );
};

export default SnakeGame;
