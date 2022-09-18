import { RIGHT } from "../constants";
import emptyRows from "./empty-rows";
import getRandom from "./get-random";

const initialState = {
  rows: emptyRows(),
  snake: [getRandom()],
  food: getRandom(),
  direction: RIGHT,
  speed: 500,
};

export default initialState;
