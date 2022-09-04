export default class Store {
  constructor() {
    this._store = [];
  }

  setStore(items) {
    if (Array.isArray(items)) {
      this._store.push(...items);
    } else {
      this._store.push(items);
    }
    return this._store;
  }

  getStore() {
    return this._store;
  }
}
