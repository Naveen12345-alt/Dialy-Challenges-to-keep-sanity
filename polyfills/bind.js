/**
 *
 * @param  {...any} args
 * @returns function that can take in more args
 */
Function.prototype.customBind = function (...args) {
  const context = args[0];
  const arguments = args.slice(1);
  return function (...moreargs) {
    fn.apply(context, arguments.push(...moreargs));
  };
};

this.x = 9; // this refers to global "window" object here in the browser
const obj = {
  x: 81,
  getX: function () {
    return this.x;
  },
};
obj.getX(); // 81
const retrieveX = obj.getX;
retrieveX();
// returns 9 - The function gets invoked at the global scope
// Create a new function with 'this' bound to module
// New programmers might confuse the
// global const x with module's property x
const boundGetX = retrieveX.bind(obj);
console.log(boundGetX()); // 81
