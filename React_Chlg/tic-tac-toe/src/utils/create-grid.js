import { playDimesion } from "../constants";

const { HEIGHT, WIDTH } = playDimesion;
const gameGrid = Array(HEIGHT)
  .fill(0)
  .map((_) => Array(WIDTH).fill("game-grid"));

export default gameGrid;
