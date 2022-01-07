import { initApple } from "./apple";
import { initSnake, moveSnake } from "./snake";
import { Pixel, VirtualGrid } from "./types";
import { displayMessage } from "./util";

import "./style.css";

export const ROWS = 32;
export const CELLCOUNT = 32;

export const virtualGrid: VirtualGrid = [];

let moveTimer: number | undefined;

function createGrid() {
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

function tick() {
  moveTimer = setInterval(() => {
    try {
      moveSnake();
      initApple();
    } catch (e) {
      console.log({ e });
      clearInterval(moveTimer);
      displayMessage("Game ended");
    }
  }, 125);
}

function main() {
  createGrid();
  initSnake();
  tick();
}

main();
