export type VirtualGrid = Array<Array<Pixel>>;
export type Direction = "N" | "W" | "E" | "S";

export interface Pixel extends HTMLDivElement {
  isSnake: boolean;
  isApple: boolean;
}
export type XY = [x: number, y: number];
