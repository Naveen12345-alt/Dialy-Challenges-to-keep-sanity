Array.prototype.flatten = function (depth = 1) {
  const arr = this;
  let res = [];
  for (let [index, item] of arr.entries()) {
    if (Array.isArray(item) && depth >= 0) {
      res.push(...item.flatten(depth - 1));
    } else {
      res.push(item);
    }
  }

  return res;
};

const nestedArr = [
  [1],
  [
    [1, 4, [5, 3]],
    [1, 2, 3, [3, 4, [2, [22, [3, 4, 5, 6, 5, [2]]]]], 4],
  ],
];
//const nestedArr = [1, 2, 3, 4, [1]]
const flat = nestedArr.flatten(2);
console.log(flat);
