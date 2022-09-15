/**
 * Executes callback on each item of array and returns new array
 * @param {function} cb callback which takes item,index,and exceution context as params
 * @returns array/[]
 */
Array.prototype.customMap = function (cb) {
  const res = [];
  const arr = this;
  for (let [index, val] of arr.entries()) {
    if (val) {
      res[index] = cb(val, index, arr);
    }
  }

  return res;
};

// example
const numbers = [1, 2, 3, 4];
numbers[10] = 34;
const double = numbers.customMap((item, index) => {
  return item * 2;
});
console.log(double);
