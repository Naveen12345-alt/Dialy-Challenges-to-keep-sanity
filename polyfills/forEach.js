/**
 * Call cb on each item
 * @param {Function} cb
 */
Array.prototype.customForEach = function (cb) {
  const arr = this;
  const res = [];
  for (let [index, item] of arr.entries()) {
    if (item) {
      cb(item, index, arr);
    }
  }
};

const words = ["adam", "ate", "an", "apple"];
const upperCaseList = [];
words.customForEach((word, index, context) => {
  upperCaseList.push(word.toUpperCase());
});
console.log(upperCaseList);
