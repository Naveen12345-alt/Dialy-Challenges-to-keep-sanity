/**
 *As we do care about the order of the results, we will use Array.reduce
 *The callback passed as an iterator to each asyncAction, must keep track of the taskList array index, and on meeting the length of the array invoke the resultsCallback with the desired results array.
 *Again for simplicity the error case is not handled, but can be handled by passing an error parameter in the resultsCallback
 *As we have to execute the tasks sequentially, we will use Promise, and the starting value of of the reduce array will be Promise.resolve()
 * @param {Array} taskList Tasks to be executed synchronously
 * @param {function} cb
 */

function asyncSeries(taskList, cb) {
  const res = [];

  taskList.reduce(async (acc, task) => {
    const resp = await acc;
    return await new Promise((resolve, reject) => {
      task((val) => {
        res.push(val);
        if (res.length === taskList.length) {
          cb(res);
        } else {
          resolve();
        }
      });
    });
  }, Promise.resolve());
}

function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
  return function (callback) {
    setTimeout(() => {
      callback(value);
    }, value * 1000);
  };
}

const taskList = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];
asyncSeries(taskList, (result) => {
  console.log("got the results", result);
});
