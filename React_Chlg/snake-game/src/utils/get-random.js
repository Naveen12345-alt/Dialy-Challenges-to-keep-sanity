import { WIDTH, HEIGHT } from "../constants";

const getRandom = () => {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
};

export default getRandom;
