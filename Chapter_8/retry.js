"use strict";
class MultiplicatorUnitFailure extends Error {
}
const primitiveMultiply = (a, b) => {
    const success = Math.random() > 0.8 ? true : false;
    if (success)
        return a * b;
    throw new MultiplicatorUnitFailure("Failure");
};
const callUntilSuccess = (a, b) => {
    try {
        console.log();
        return primitiveMultiply(a, b);
    }
    catch (error) {
        if (error instanceof MultiplicatorUnitFailure) {
            return callUntilSuccess(a, b);
        }
        else {
            throw error;
        }
    }
};
const loopUntilSuccess = (a, b) => {
    for (;;) {
        try {
            return primitiveMultiply(a, b);
        }
        catch (e) {
            if (!(e instanceof MultiplicatorUnitFailure)) {
                throw e;
            }
        }
    }
};
console.log(loopUntilSuccess(1, 2));
