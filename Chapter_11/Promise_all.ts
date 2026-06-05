// Make a custom Promise.all function called Promise_all
/**
 * It must:
 * - wait for all of the promises in teh array to finish
 * - then succeed yielding an array of result values
 * - if a promise in the array fails, the promise returned by all fails too, passing on the failure reason from the failing promise
 */

/**
 * A promise is just an object that wraps a value
 *
 * It is created like this:
 *
 * new Promise((resolve, reject) => {
 * // do some work...
 * resolve(value) // called to fulfil promise
 * reject(resaon) called to reject promise
 * });
 *
 * With the code:
 * const p = new Promise<number>((resolve) => {
 * resolve(42);
 * });
 * p.then(val => console.log(val));
 * Does the console.log run synchronously right now, or later? Why?
 *
 * The code would run synchronously as there is nothing in the code to cause it to wait.
 * The value is immediately available.
 *
 * Promise.race()
 *
 * Promise.race(promises) returns a new promise that fulfils as soon as the first promise in the array resolves.
 *
 * Given that resolve or reject is called on a promise's executor and given that calling them a second time has no effect,
 * calling resolve for each item of the array will cause the first one to win the race and resolve the promise.
 *
 */
function promiseRace<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((res, rej) => {
    for (let promise of promises) {
      promise.then(res, rej);
    }
  });
}
function promiseAny<T>(promises: Promise<T>[]): Promise<T> {
  let count = 0;
  return new Promise((res, rej) => {
    const reasonArr: string[] = [];
    promises.forEach((promise, index) => {
      promise.then(res, (reason) => {
        count++;
        reasonArr[index] = reason;
        if (count === promises.length) {
          return rej(reasonArr.join(" "));
        }
      });
    });
  });
}
function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  let count = 0;
  return new Promise((res, rej) => {
    const valuesArr: T[] = [];
    promises.forEach((promise, index) => {
      promise.then((value) => {
        count++;
        valuesArr[index] = value;
        if (count === promises.length) {
          return res(valuesArr);
        }
      }, rej);
    });
  });
}
