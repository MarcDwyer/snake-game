import "./style.css";

// const app = document.querySelector<HTMLDivElement>("#app")!;
export type VirtualGrid = Array<Array<HTMLDivElement>>;
type Direction = "N" | "W" | "E" | "S";

const UpdatedCoords = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
};
const ROWS = 32;
const CELLCOUNT = 32;

const virtualGrid: VirtualGrid = [];

const snake: Array<[number, number]> = [];
const snakePixels = new Set();

let direction: Direction = "E";

let moveTimer: number | undefined;

function createGrid() {
  const grid = document.querySelector(".grid");

  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.className = `row row-${i}`;
    const virtualRow: HTMLDivElement[] = [];

    for (let j = 0; j < CELLCOUNT; j++) {
      const cellEle = document.createElement("div");

      cellEle.className = `cell cell-${j}`;

      row.append(cellEle);
      virtualRow.push(cellEle);
    }

    virtualGrid.push(virtualRow);
    grid?.append(row);
  }
}

function getNewCoords(prevX: number, prevY: number): [number, number] {
  const { x, y } = UpdatedCoords[direction];
  return [x + prevX, y + prevY];
}

function drawSnake() {
  for (const [x, y] of snake) {
    const pixel = virtualGrid[y][x];

    pixel.classList.add("marked-cell");
    // snakePixels.add(pixel);
  }
}
function removePixel([x, y]: [x: number, y: number]) {
  const pixel = virtualGrid[y][x];

  pixel.classList.remove("marked-cell");
}
function tick() {
  let prevCoord;
  for (let i = 0; i < snake.length; i++) {
    removePixel(snake[i]);
    const nextPixel: [number, number] =
      prevCoord || getNewCoords(snake[i][0], snake[i][1]);
    prevCoord = snake[i];
    snake[i] = nextPixel;
  }
  drawSnake();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "S") {
        direction = "N";
      }
      break;
    case "ArrowDown":
      if (direction !== "N") {
        direction = "S";
      }
      break;
    case "ArrowRight":
      if (direction !== "W") {
        direction = "E";
      }
      break;
    case "ArrowLeft":
      if (direction !== "E") {
        direction = "W";
      }
  }
});

function play() {
  moveTimer = setInterval(() => {
    tick();
  }, 100);
}
function main() {
  createGrid();
  const startingY = CELLCOUNT / 2;
  const startingX = ROWS / 2;

  // Mid point of grid
  snake.push(
    [startingX, startingY],
    [startingX, startingY + 1],
    [startingX, startingY + 2]
  );

  drawSnake();
  play();
}

main();
