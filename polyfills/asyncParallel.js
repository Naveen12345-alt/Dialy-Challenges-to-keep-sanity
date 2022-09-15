function asyncParallel(taskFunc, cb) {
  const res = [];

  taskFunc.forEach((task) => {
    try {
      task((val) => {
        res.push(val);
        if (res.length === taskFunc.length) {
          cb(res);
        }
      });
    } catch (error) {
      return error;
    }
  });
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
  createAsyncTask(),
];
asyncParallel(taskList, (result) => {
  console.log("got the results", result);
});
