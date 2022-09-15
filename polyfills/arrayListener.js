Array.prototype.listeners = {};

Array.prototype.addListener = function (eventName, cb) {
  if (!this.listeners[eventName]) {
    this.listeners[eventName] = [];
  }
  this.listeners[eventName].push(cb);
};

Array.prototype.pushWithEvent = function (...args) {
  this.push(...args);
  this.triggerEvent("add", args);
};

Array.prototype.triggerEvent = function (eventName, arguments) {
  if (this.listeners[eventName]?.length) {
    this.listeners[eventName].forEach((cb) => {
      cb(eventName, arguments, this);
    });
  }
};

// example
const a = [];
a.addListener("add", (items, args) => {
  console.log("items were added", args);
});
a.addListener("add", (items, args) => {
  console.log("items were added again", args);
});
a.pushWithEvent(1, 2, 3, "a", "b");
console.log(a);
a.pushWithEvent("hello");
a.pushWithEvent(55);
setTimeout(() => {
  a.pushWithEvent("delayed");
}, 5000);
