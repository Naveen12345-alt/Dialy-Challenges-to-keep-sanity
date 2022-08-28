export default class Controller {
  options = ['🟢', '❌'];

  constructor() {
    this.currentPlayer = 0;
  }

  switchControl() {
    this.currentPlayer = this.currentPlayer ? 0 : 1;
    return this.currentPlayer;
  }

  getOption(player) {
    return this.options[player];
  }

  getControl() {
    return this.currentPlayer;
  }

  checkWinner(grid, currentPlayer) {
    const checkRow = (row) => row.every((el) => el === currentPlayer);
    const checkCol = (col) =>
      [grid[0][col], grid[1][col], grid[2][col]].every((el) => el === currentPlayer);

    const checkDiag = (grid) =>
      (grid[0][0] === currentPlayer && grid[1][1] === currentPlayer && grid[2][2]) ||
      (grid[2][0] === currentPlayer &&
        grid[1][1] === currentPlayer &&
        grid[0][2] === currentPlayer);

    if (checkDiag(grid)) return true;

    for (let [i, row] of grid.entries()) {
      if (checkRow(row)) return true;
      if (checkCol(i)) return true;
    }

    return false;
  }
}
