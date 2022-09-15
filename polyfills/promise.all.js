function myPromiseAll(promises) {
  const res = [];
  let completed = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          res[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(res);
          }
        })
        .catch((e) => reject(e));
    });
  });
}

function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}
const taskList = [task(1000), task(5000), task(3000)];

myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch(console.error);
