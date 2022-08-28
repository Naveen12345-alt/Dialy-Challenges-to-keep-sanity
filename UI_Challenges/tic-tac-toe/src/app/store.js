export default class Store {
  constructor() {
    this._store = new Array(3).fill(null).map((el) => new Array(3).fill(null));
    this._turns = 1;
  }

  getTurns() {
    return this._turns;
  }

  incrementTurns() {
    return this._turns++;
  }

  initStore() {
    this._store = new Array(3).fill(null).map((el) => new Array(3).fill(null));
    this._turns = 1;
  }

  getStore() {
    return this._store;
  }

  setItem(cellId, value) {
    const [row, col] = this.getRowCol(cellId);
    this._store[row][col] = value;
    return value;
  }

  getItem(cellId) {
    const [row, col] = this.getRowCol(cellId);
    return this._store[row][col];
  }

  getRowCol(cellId) {
    const row = Math.floor((cellId - 1) / 3);
    const col = (cellId - 1) % 3;
    return [row, col];
  }
}
