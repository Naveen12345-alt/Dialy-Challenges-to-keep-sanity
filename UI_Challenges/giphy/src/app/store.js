export default class Store {
  constructor() {
    this._store = [];
    this.storeCount = 0;
    this.getStoreCount();
  }

  getStoreCount() {
    this.storeCount = this._store.length;
    return this._store.length;
  }

  getStore() {
    return this._store;
  }

  setStore(items) {
    this._store.push(...items);
  }

  clearStore() {
    this._store = [];
  }

  transformData(res) {
    return res.map((el) => ({
      url: el.images.fixed_height.url,
      id: el.id,
      link: el.url,
      title: el.title,
    }));
  }
}
