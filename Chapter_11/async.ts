/**
 * Regular javascript computations can fail by throwing an exception.
 * Async computations often need something like that.
 * One of the most pressing problems with the callback style of async programming is that it makes it extremely difficult to ensure failures are properly reported to the callbacks.
 *
 * A common convention is to use the first argument to the callback to indicate that the action failed, and the second to pass the value produced by the action when it was successful.
 */

async function someAsyncFunction(error: any, value: any) {
  if (error) throw new Error(error);
  else return value;
}

// Such functions are either resolved or rejected

// Much like resolving the promise provides a value, rejecting one also provides a value, usually called the reason of the rejection.
// There is a Promise.reject function that creates a new, immediately rejected promise.

// To explicitly handle such rejections, promises have a catch method that registers a handler to. be called when the promise is rejected, similar to how then handlers handle a normal resolution.

// As a shorthand, then also accepts a rejection handler as a second argument, so you can install both types of handlers in a single method call: .then(acceptHandler, rejectHandler)

// When our readTextFile function encounters a problem, it passes the error to its callback function as a second argument. Our textFile wrapper should actually check that argument so that a failure causes the promise it returns to be rejected
const readTextFile = (a: string, b: (x: string, y: string) => void) => {
  return `${a}, ${b}`;
};

function textFile(filename: string) {
  return new Promise((res, rej) => {
    readTextFile(filename, (text: string, error: string) => {
      if (error) rej(error);
      else res(text);
    });
  });
}

/**
 * Chains of promise valuse created by callse to then and catch form a pipeline through which async valuse or failures move
 * Since chains are created by registering handlers, each link has a success handler or a rejection handler (or both) associated with it
 * Handlers that don't match the outtcome are ignored.
 */

new Promise((_, reject) => reject(new Error("Fail")))
  .then((value) => console.log("Handler 1:", value))
  .catch((reason) => {
    console.log("Caught failure " + reason);
    return "nothing";
  })
  .then((value) => console.log("Handler 2:", value));
// The first handler function isn't called because at that point of the pipeline the promise holds a rejection.
// The catch handler handles that rejection and returns a value.

// Much like an uncaught exception is handled by the environment, JS environments can detect whena promise rejection isn't handled and will report this as an error

// Carla
/**
 * Create a joinWifi function that tries digits and registers the time taken for rejection
 * The function must wait for the resulting digit and timing and pass along the function recursively if the promise is resolved
 */
// function sendDigit(digit: number) {
//   setTimeout(() => {
//     console.log("Called with " + digit);
//   }, 300);
//   const num: number = Math.floor(Math.random() * 10);
//   const success: boolean = num < 5 ? false : true;
//   return success;
// }
// const joinWifi = async () => {
//   let callStack = 0;
//   console.log("in function");
//   let code: number[] = [];
//   if (code.length > 0) {
//     for (let num of code) {
//       sendDigit(num);
//     }
//   }
//   // Try digit
//   function nextDigit(digit: number) {
//     let number = digit;
//     if (callStack > 5) return;
//     new Promise((rej, res) => {
//       console.log(code);
//       if (sendDigit(number) == false) {
//         rej("Failed");
//       } else {
//         res("Success");
//         callStack++;
//         debugger;
//         code.push(number);
//         number++;
//         // Advance digit and return
//         return nextDigit(number);
//       }
//     }).catch((err) => {
//       throw new Error("ERROR", err);
//     });
//   }
//   nextDigit(0);
// };

// joinWifi();

function withTimeout(promise: any, time: number) {
  return new Promise((res, rej) => {
    promise.then(res, rej);
    setTimeout(() => rej("Timed out"), time);
  });
}

// function crackPassword(networkID: number) {
//   function nextDigit(code: number | string, digit: number): any {
//     let newCode = code + String(digit);
//     return withTimeout(joinWifi(networkID, newCode), 50)
//       .then(() => newCode)
//       .catch((failure) => {
//         if (failure == "Timed out") {
//           return nextDigit(newCode, 0);
//         } else if (digit < 9) {
//           return nextDigit(code, digit + 1);
//         } else {
//           throw failure;
//         }
//       });
//   }
//   return nextDigit("", 0);
// }
// crackPassword(192.168.0.1).then(console.log)

function joinWifi(a: string, b: string) {
  return true;
}

async function crackPasscodeAsync(networkID: any) {
  for (let code = ""; ; ) {
    for (let digit = 0; ; digit++) {
      let newCode = code + digit;
      try {
        await withTimeout(joinWifi(networkID, newCode), 50);
        return newCode;
      } catch (failure) {
        if (failure == "Timed out") {
          code = newCode;
          break;
        } else if (digit == 9) {
          throw failure;
        }
      }
    }
  }
}

// Generators
// Writing function* yields a generator.
// Like asynchronous functions and promises, generators have the ability to pause the execution of the function.

function* powers(n: number) {
  if (n <= 1) return;
  for (let current = n; ; current *= n) {
    yield current;
  }
}
powers(3);
for (let power of powers(3)) {
  if (Number(power) > 50) break;
  console.log(power);
}

// Writing iterators is easier using generator functions
class Grouple<T> {
  members: T[] = [];

  constructor(members: T[]) {
    this.members = members;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.members.length; i++) {
      yield this.members[i];
    }
  }
}

// An async function is a special type of generator. It produces a promise when alled, which is resolved when it returns(finishes) and rejected when it throws an exception.
// Whenever it yields(awaits) a promise, the result of that promise(value or thrown exception) is teh result of the await expression.
