export default class Store {
  constructor() {
    this.store = [];
    this.getStore();
  }

  getStore() {
    this.store = JSON.parse(window.localStorage.getItem('calendar-events')) ?? [];
    return this.store;
  }

  setStore(item) {
    this.store.push(item);
    window.localStorage.setItem('calendar-events', JSON.stringify(this.store));
  }

  saveEventCb(title, description, timestamp) {
    const eventInfo = { title, description, timestamp };
    this.setStore(eventInfo);
  }
}
