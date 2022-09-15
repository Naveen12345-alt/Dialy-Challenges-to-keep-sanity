/**
 *
 * @param {Function} cb accepts accumulator,item,index,and execution
 * @param {any} initialValue Optional
 * @returns accumulator
 */
Array.prototype.customReduce = function (cb, initialValue) {
  let accumulator = initialValue || undefined;
  const arr = this;
  for (let [index, item] of arr.entries()) {
    if (accumulator === undefined) {
      accumulator = item;
    } else {
      accumulator = cb(accumulator, item, index, arr);
    }
  }

  return accumulator;
};

const nums = [1, 2, 3, 4, 5];
const double = nums.customReduce((accum, current) => {
  accum.push(current * 2);
  return accum;
}, []);
console.log(double);
const queryString = "cat=meow&duck=quack&dog=woof";
const queryObject = queryString.split("&").customReduce((accum, current) => {
  const splitString = current.split("=");
  accum[splitString[0]] = splitString[1];
  return accum;
}, {});
console.log(queryObject);
