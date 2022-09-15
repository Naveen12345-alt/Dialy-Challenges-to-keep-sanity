/**
 * Passes every array item thru cb and if array items passes test
 * implemented by cb; pushes them to new array; and
 * return new array
 * @param {function} cb Callback accepts these params internally > item,index,and execution context
 * @param {Object} execution Optional
 * @returns new Array
 */
Array.prototype.customFilter = function (cb, execution) {
  const res = [];
  for (let [index, item] of this.entries()) {
    if (cb.call(execution, item, index, this)) {
      res.push(item);
    }
  }

  return res;
};

// example
const numbers = [1, 2, 3, 4];
const even = numbers.customFilter((item) => item % 2 === 0);
console.log(even);
