import { Direction, XY } from "./types";

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function displayMessage(msg: string) {
  const msgEle = document.querySelector(".message");
  if (msgEle) msgEle.textContent = msg;
}

export function checkIfValidDirection(
  nextDirection: Direction,
  currDirection: Direction
) {
  if (
    (nextDirection === "E" && currDirection === "W") ||
    (nextDirection === "W" && currDirection === "E") ||
    (nextDirection === "N" && currDirection === "S") ||
    (nextDirection === "S" && currDirection === "N")
  ) {
    return false;
  }

  return true;
}

export function didHitApple(snakeHead: XY, apple: XY) {
  if (snakeHead[0] === apple[0] && snakeHead[1] === apple[1]) {
    return true;
  }

  return false;
}
