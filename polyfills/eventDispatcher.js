class EventDispatcher {
  constructor() {
    this._listeners = {};
  }

  addEventListener(type, cb) {
    if (!this._listeners[type]) {
      this._listeners[type] = [];
    }
    if (this._listeners[type].indexOf(cb) === -1) {
      this._listeners[type].push(cb);
    }
  }

  removeEventListener(type, cb) {
    if (!this._listeners?.[type]) return;

    const index = this._listeners[type].indexOf(cb);

    if (index >= 0) {
      this._listeners[type].splice(index, 1);
    }
  }

  dispatchEvent(event) {
    if (!this._listeners?.[event.type]?.length) {
      return;
    }

    const cbArr = [...this._listeners[event.type]];

    event.target = this;

    for (let cb of cbArr) {
      cb.call(this, event);
    }
  }
}

// example using below
const ed = new EventDispatcher();
// DO NOT USE ON PRODUCTION. ONLY FOR EXAMPLE
const event = {
  target: null,
  type: "my-event",
};
const listener = () => {
  console.log("handled!");
};
ed.addEventListener("my-event", listener);
// should be handled
ed.dispatchEvent(event);
ed.removeEventListener("my-event", listener);
// should not be handled
ed.dispatchEvent(event);
