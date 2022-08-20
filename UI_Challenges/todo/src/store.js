export default class Store {
  constructor() {
    this._store = [];
  }

  getAllTodos() {
    return this._store;
  }

  setLocalStore() {
    window.localStorage.setItem('task-list', JSON.stringify(this._store));
  }

  setStore(data) {
    if (data) {
      this._store = data;
      this.setLocalStore();
    }
  }

  getStore() {
    if (window.localStorage['task-list'] && !this._store.length) {
      this._store = JSON.parse(window.localStorage.getItem('task-list'));
      return this._store;
    } else {
      return this._store;
    }
  }

  addTodo(value) {
    if (value) {
      this._store.push({
        id: new Date().getTime().toString(),
        title: value,
        done: false,
      });

      this.setLocalStore();
      return this._store[this._store.length - 1];
    }
  }

  getTodoById(id) {
    return this._store.find((el) => el.id === id);
  }

  patchTodo(id, value) {
    const todoToPatch = this.getTodoById(id);

    todoToPatch.value = value;
    this.setLocalStore();
  }

  deleteTodo(id) {
    const todoToDelete = this.getTodoById(id);
    this._store.splice(this._store.indexOf(todoToDelete), 1);
    this.setLocalStore();
    return this._store;
  }

  changeStatus(id, status) {
    const todo = this.getTodoById(id);
    todo.done = status;
    this.setLocalStore();
  }
}
