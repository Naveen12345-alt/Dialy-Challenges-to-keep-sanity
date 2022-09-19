const checkWinner = (grid) => {
  if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    if (grid[0][0].split(" ")[1] === "X") {
      alert("User 2 Wins");
    } else if (grid[0][0].split(" ")[1] === "O") {
      alert("User 1 Wins");
    }
    return;
  }

  if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    if (grid[0][2].split(" ")[1] === "X") {
      alert("User 2 Wins");
    } else if (grid[0][2].split(" ")[1] === "O") {
      alert("User 1 Wins");
    }
    return;
  }

  const checkRow = (i) =>
    grid[i][0] === grid[i][1] &&
    grid[i][1] === grid[i][2] &&
    ["O", "X"].includes(grid[i][2].split(" ")[1]);
  const checkCol = (j) =>
    grid[0][j] === grid[1][j] &&
    grid[2][j] === grid[1][j] &&
    ["O", "X"].includes(grid[2][j].split(" ")[1]);

  for (let [index, row] of grid.entries()) {
    let winner;
    if (checkRow(index)) {
      winner = grid[index][0];
    } else if (checkCol(index)) {
      winner = grid[0][index];
    }
    if (winner) {
      alert(`User ${winner.split(" ")[1]} wins`);
      return;
    }
  }
  return;
};

export default checkWinner;
