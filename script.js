Array.prototype.myMap = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result[i] = callback(this[i], i, Array);
    }
    return result;
};

Array.prototype.myFilter = function (callback) {
    const filteredArr = [];
    for (let i = 0; i < this.length; i++) {
        if (!!callback(this[i], i, this)) {
            filteredArr.push(this[i]);
        }
    }
    return filteredArr;
};

Array.prototype.myReduce = function (callback, accumulator) {
    if (this.length < 1) {
        throw new Error("Array is empty");
    }

    if (!accumulator) {
        if (typeof this[0] === "string") {
            accumulator = "";
        } else if (typeof this[0] === "number") {
            accumulator = 0;
        }
    }

    for (let i = 0; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};

Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

Array.prototype.mySome = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        } else {
            continue;
        }
    }
    return false;
};

Array.prototype.myEvery = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        } else {
            continue;
        }
    }
};

Array.prototype.myPush = function (...values) {
    const { length: arrayLength } = this;
    const { length: valuesLength } = values;

    for (let index = 0; index < valuesLength; index += 1) {
        this[arrayLength + index] = values[index];
    }

    return this.length;
};

Array.prototype.myConcat = function (...values) {
    const result = [...this];
    const { length } = values;

    for (let i = 0; i < length; i += 1) {
        const value = values[i];

        if (Array.isArray(value)) {
            result.myPush(...value);
        } else {
            result.myPush(value);
        }
    }

    return result;
};

// Custom array flat method
Array.prototype.myFlat = function (depth = 1) {
    if (depth < 1) {
        return this;
    }
    return this.myReduce((acc, item) => {
        if (Array.isArray(item)) {
            acc = acc.myConcat(item.myFlat(depth - 1));
        } else {
            acc = [...acc, item];
        }
        return acc;
    }, []);
};

// Flattening all nested arrays with recursion
Array.prototype.flattenAllNestedArrays = function () {
    return this.myReduce((acc, item) => {
        if (Array.isArray(item)) {
            acc = acc.myConcat(item.flattenAllNestedArrays());
        } else {
            acc = [...acc, item];
        }
        return acc;
    }, []);
};

Array.prototype.myFlatMap = function (callback) {
    return this.myFlat().myMap(callback);
};

Array.prototype.myIncludes = function (searchedValue) {
    return this.mySome((value) => value === searchedValue);
};

Array.prototype.myConcat = function (...values) {
    const result = [...this];

    for (let i = 0; i < values.length; i += 1) {
        const value = values[i];

        if (Array.isArray(value)) {
            result.myPush(...value);
        } else {
            result.myPush(value);
        }
    }

    return result;
};

Array.prototype.myJoin = function (joinWith) {
    return this.myReduce((result, current, index) => {
        if (index === 0) {
            return current;
        }

        return `${result}${joinWith}${current}`;
    }, "");
};

Array.prototype.myReverse = function () {
    const result = [];

    for (let index = this.length - 1; index > -1; index -= 1) {
        const value = this[index];
        result[this.length - 1 - index] = value;
    }

    return result;
};

Array.prototype.myShift = function () {
    const firstValue = this[0];

    for (let index = 1; index < this.length; index += 1) {
        const value = this[index];
        this[index - 1] = value;
    }

    this.length = this.length - 1;

    return firstValue;
};

Array.prototype.myUnshift = function (...values) {
    const mergedArrays = values.myConcat(...this);
    const { length: mergedArraysLength } = mergedArrays;

    for (let i = 0; i < mergedArraysLength; i++) {
        const value = mergedArrays[i];
        this[i] = value;
    }

    return this.length;
};

Array.prototype.mySlice = function (startIndex = 0, endIndex = this.length) {
    const result = [];

    for (let index = startIndex; index < endIndex; index += 1) {
        const value = this[index];

        if (index < this.length) {
            result.myPush(value);
        }
    }

    return result;
};

Array.prototype.myPop = function () {
    const value = this[this.length - 1];
    this.length = this.length - 1;
    return value;
};

Array.prototype.myFill = function (
    value,
    startIndex = 0,
    endIndex = this.length
) {
    for (let i = startIndex; i < endIndex; i++) {
        this[i] = value;
    }

    return this;
};

Array.prototype.mySplice = function (
    insertAtIndex,
    removeNumberOfElements,
    ...values
) {
    const firstPart = this.mySlice(0, insertAtIndex);
    const secondPart = this.mySlice(insertAtIndex + removeNumberOfElements);

    const removedElements = this.mySlice(
        insertAtIndex,
        insertAtIndex + removeNumberOfElements
    );
    const joinValues = secondPart.myConcat(values);
    const joinedParts = firstPart.myConcat(joinValues);
    const { length: joinedPartsLength } = joinedParts;

    for (let i = 0; i < joinedPartsLength; i++) {
        this[i] = joinedParts[i];
    }

    this.length = joinedPartsLength;

    return removedElements;
};

Array.prototype.myFindIndex = function (callback) {
    for (let i = 0; i < this.length; i++) {
        const value = array[i];

        if (callback(value, i, array)) {
            return i;
        }
    }

    return -1;
};

Array.prototype.myFind = function (callback) {
    const index = this.myFindIndex(callback);

    if (index === -1) {
        return undefined;
    }

    return array[index];
};

Array.prototype.myIndexOf = function (searchedValue) {
    return this.myFindIndex((value) => value === searchedValue);
};

Array.prototype.myIndexOf = function (searchedValue) {
    for (let index = array.length - 1; index > -1; index -= 1) {
        const value = array[index];

        if (value === searchedValue) {
            return index;
        }
    }

    return -1;
};

Array.prototype.mySort = function (cb) {
    function defaultComparator(a, b) {
        a = a.toString();
        b = b.toString();
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    for (var i = 0; i < this.length; i++) {
        for (var j = i + 1; j < this.length; j++) {
            if ((cb || defaultComparator)(this[i], this[j]) > 0) {
                var swap = this[i];
                this[i] = this[j];
                this[j] = swap;
            }
        }
    }
    return this;
};

const STATE = {
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
    PENDING: "pending",
};

class MyPromise {
    #thenCbs = [];
    #catchCbs = [];
    #state = STATE.PENDING;
    #value;
    #onSuccessBind = this.#onSuccess.bind(this);
    #onFailBind = this.#onFail.bind(this);

    constructor(cb) {
        try {
            cb(this.#onSuccessBind, this.#onFailBind);
        } catch (e) {
            this.#onFail(e);
        }
    }

    #runCallbacks() {
        if (this.#state === STATE.FULFILLED) {
            this.#thenCbs.forEach((callback) => {
                callback(this.#value);
            });

            this.#thenCbs = [];
        }

        if (this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach((callback) => {
                callback(this.#value);
            });

            this.#catchCbs = [];
        }
    }

    #onSuccess(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return;

            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind);
                return;
            }

            this.#value = value;
            this.#state = STATE.FULFILLED;
            this.#runCallbacks();
        });
    }

    #onFail(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return;

            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind);
                return;
            }

            if (this.#catchCbs.length === 0) {
                throw new UncaughtPromiseError(value);
            }

            this.#value = value;
            this.#state = STATE.REJECTED;
            this.#runCallbacks();
        });
    }

    then(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            this.#thenCbs.push((result) => {
                if (thenCb == null) {
                    resolve(result);
                    return;
                }

                try {
                    resolve(thenCb(result));
                } catch (error) {
                    reject(error);
                }
            });

            this.#catchCbs.push((result) => {
                if (catchCb == null) {
                    reject(result);
                    return;
                }

                try {
                    resolve(catchCb(result));
                } catch (error) {
                    reject(error);
                }
            });

            this.#runCallbacks();
        });
    }

    catch(cb) {
        return this.then(undefined, cb);
    }

    finally(cb) {
        return this.then(
            (result) => {
                cb();
                return result;
            },
            (result) => {
                cb();
                throw result;
            }
        );
    }

    static resolve(value) {
        return new Promise((resolve) => {
            resolve(value);
        });
    }

    static reject(value) {
        return new Promise((resolve, reject) => {
            reject(value);
        });
    }

    static all(promises) {
        const results = [];
        let completedPromises = 0;
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise
                    .then((value) => {
                        completedPromises++;
                        results[i] = value;
                        if (completedPromises === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch(reject);
            }
        });
    }

    static allSettled(promises) {
        const results = [];
        let completedPromises = 0;
        return new MyPromise((resolve) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise
                    .then((value) => {
                        results[i] = { status: STATE.FULFILLED, value };
                    })
                    .catch((reason) => {
                        results[i] = { status: STATE.REJECTED, reason };
                    })
                    .finally(() => {
                        completedPromises++;
                        if (completedPromises === promises.length) {
                            resolve(results);
                        }
                    });
            }
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise) => {
                promise.then(resolve).catch(reject);
            });
        });
    }

    static any(promises) {
        const errors = [];
        let rejectedPromises = 0;
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise.then(resolve).catch((value) => {
                    rejectedPromises++;
                    errors[i] = value;
                    if (rejectedPromises === promises.length) {
                        reject(
                            new AggregateError(
                                errors,
                                "All promises were rejected"
                            )
                        );
                    }
                });
            }
        });
    }
}

class UncaughtPromiseError extends Error {
    constructor(error) {
        super(error);

        this.stack = `(in promise) ${error.stack}`;
    }
}

function deepClone(object) {
    var newObject = {};
    for (var key in object) {
        if (typeof object[key] === "object" && object[key] !== null) {
            newObject[key] = deepClone(object[key]);
        } else {
            newObject[key] = object[key];
        }
    }
    return newObject;
}
