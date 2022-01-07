import { Direction } from "./types";
import { CELLCOUNT, ROWS, virtualGrid } from "./main";
import { checkIfValidDirection, didHitApple } from "./util";
import { appleCoords, handleAppleHit } from "./apple";

const UpdatedCoords = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
};

let snake: Array<[number, number]> = [];

let currDirection: Direction = "E";
let nextDirection: Direction = currDirection;

export let endGame = false;

function getNewCoords(prevX: number, prevY: number): [number, number] {
  const { x, y } = UpdatedCoords[currDirection];
  return [x + prevX, y + prevY];
}

function removeSnakePixel([x, y]: [x: number, y: number]) {
  const pixel = virtualGrid[y][x];

  pixel.classList.remove("marked-cell");
  pixel.isSnake = false;
}

function setNextSnakeCoords() {
  let prevCoord;
  for (let i = 0; i < snake.length; i++) {
    removeSnakePixel(snake[i]);
    const nextPixel: [number, number] =
      prevCoord || getNewCoords(snake[i][0], snake[i][1]);

    if (i === 0 && appleCoords && didHitApple(nextPixel, appleCoords)) {
      // hit apple
      snake.push([0, 0]);
      handleAppleHit();
    } else if (i === 0 && virtualGrid[nextPixel[1]][nextPixel[0]].isSnake) {
      endGame = true;
    }

    prevCoord = snake[i];
    snake[i] = nextPixel;
  }
}

function drawSnake() {
  for (const [x, y] of snake) {
    const pixel = virtualGrid[y][x];
    pixel.classList.add("marked-cell");
    pixel.isSnake = true;
  }
}

function setNextDirection(key: string) {
  switch (key) {
    case "ArrowUp":
      nextDirection = "N";
      break;
    case "ArrowDown":
      nextDirection = "S";
      break;
    case "ArrowRight":
      nextDirection = "E";
      break;
    case "ArrowLeft":
      nextDirection = "W";
      break;
    default:
      nextDirection = currDirection;
  }
}

export function initSnake() {
  const startingY = CELLCOUNT / 2;
  const startingX = ROWS / 2;
  snake = [];
  snake.push(
    [startingX, startingY],
    [startingX, startingY + 1],
    [startingX, startingY + 2]
  );

  drawSnake();
}

export function moveSnake() {
  if (checkIfValidDirection(nextDirection, currDirection)) {
    currDirection = nextDirection;
  }
  setNextSnakeCoords();
  drawSnake();

  if (endGame) throw "";
}

document.addEventListener("keydown", (e) => setNextDirection(e.key));
