import { HEIGHT, WIDTH } from "../constants";

const emptyRows = () =>
  [...Array(WIDTH)].map((_) => [...Array(HEIGHT)].map((_) => "grid-item"));

export default emptyRows;
