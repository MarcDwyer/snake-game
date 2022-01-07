import { CELLCOUNT, ROWS, virtualGrid } from "./main";
import { Pixel, XY } from "./types";
import { randomIntFromInterval } from "./util";

export let appleCoords: XY | undefined;

export let score = 0;

export function getNewAppleCoords() {
  let nextApple: XY | undefined;

  function getAppleCoords() {
    const randomY = randomIntFromInterval(0, ROWS - 1);

    const randomX = randomIntFromInterval(0, CELLCOUNT - 1);

    const possibleApple = virtualGrid[randomY][randomX];

    if (possibleApple.isSnake) {
      getAppleCoords();
    } else {
      nextApple = [randomY, randomX];
    }
  }

  getAppleCoords();

  return nextApple as XY;
}
function markApple() {
  const [x, y] = appleCoords as XY;
  const pixel = virtualGrid[y][x];
  pixel.classList.add("apple");
}
function unmarkApple() {
  const [x, y] = appleCoords as XY;
  const pixel = virtualGrid[y][x];
  pixel.classList.remove("apple");
}
function updateScore() {
  const scoreMsg = document.querySelector(".score");
  if (scoreMsg) {
    scoreMsg.textContent = `Score: ${score}`;
  }
}

function changeApplePos() {
  const [x, y] = getNewAppleCoords();
  appleCoords = [x, y];
}
export function handleAppleHit() {
  score++;
  unmarkApple();
  updateScore();
  changeApplePos();
  markApple();
}

export function initApple() {
  if (appleCoords !== undefined) return;

  changeApplePos();
  markApple();
}
