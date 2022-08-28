export default class Store {
  constructor() {
    this._store = [];
    this.getLocalStore();
  }

  setLocalStore() {
    window.localStorage.setItem('task-tracker', JSON.stringify(this._store));
  }

  getLocalStore() {
    if (window.localStorage.getItem('task-tracker')) {
      this._store = JSON.parse(window.localStorage.getItem('task-tracker'));
    }

    return this._store;
  }

  setItemToStore(data) {
    this._store.push({ ...data, id: new Date().getTime(), status: 0 });
    this.setLocalStore();
    return this._store[this._store.length - 1];
  }

  patchStatus(id, status) {
    const node = this.getTaskById(id);
    if (node) {
      node.status = status;
      this.setLocalStore();
    }
  }

  getAllTask() {
    return this._store;
  }

  getTaskById(id) {
    const task = this._store.find((el) => el.id === id);
    return task;
  }
}
