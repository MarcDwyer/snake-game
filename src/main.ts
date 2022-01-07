import { appleTicker, initApple } from "./apple";
import { initSnake, moveSnake } from "./snake";
import { Pixel, VirtualGrid } from "./types";
import { displayMessage } from "./util";

import "./style.css";

export const ROWS = 32;
export const CELLCOUNT = 32;

let moveTimer: number | undefined;

export let virtualGrid: VirtualGrid;

function createGrid() {
  virtualGrid = [];
  const grid = document.querySelector(".grid");

  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.className = `row row-${i}`;
    const virtualRow: Pixel[] = [];

    for (let j = 0; j < CELLCOUNT; j++) {
      const cellEle = document.createElement("div") as Pixel;

      cellEle.className = `cell cell-${j}`;
      cellEle.isSnake = false;

      row.append(cellEle);
      virtualRow.push(cellEle);
    }

    virtualGrid.push(virtualRow);
    grid?.append(row);
  }
}

function showResetBtn() {
  const resetBtn = document.querySelector(".reset-btn");

  if (resetBtn) {
    (resetBtn as any).style["visibility"] = "visible";
  }
}
function tick() {
  moveTimer = setInterval(() => {
    try {
      moveSnake();
      appleTicker();
    } catch (e) {
      clearInterval(moveTimer);
      showResetBtn();
      displayMessage("Game ended");
    }
  }, 100);
}

export function resetBoard() {
  const grid = document.querySelector(".grid");

  while (grid?.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

const resetBtn = document.querySelector(".reset-btn");

resetBtn?.addEventListener("click", () => {
  resetBoard();
  main();
});

function main() {
  createGrid();
  initSnake();
  initApple();
  tick();
}

main();
