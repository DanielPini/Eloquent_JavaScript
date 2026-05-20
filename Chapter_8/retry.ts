class MultiplicatorUnitFailure extends Error {}

const primitiveMultiply = (a: number, b: number) => {
  const success = Math.random() > 0.8 ? true : false;
  if (success) return a * b;
  throw new MultiplicatorUnitFailure("Failure");
};

const callUntilSuccess = (a: number, b: number) => {
  try {
    console.log();
    return primitiveMultiply(a, b);
  } catch (error) {
    if (error instanceof MultiplicatorUnitFailure) {
      return callUntilSuccess(a, b);
    } else {
      throw error;
    }
  }
};

const loopUntilSuccess = (a: number, b: number) => {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure)) {
        throw e;
      }
    }
  }
};

console.log(loopUntilSuccess(1, 2));
