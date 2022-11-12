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
            filteredArr.push(this[index]);
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
    for (let i = 0; i < this; i++) {
        if (callback(this[i], i, this)) return true;
    }
};

Array.prototype.myEvery = function (callback) {
    for (let i = 0; i < this; i++) {
        if (!callback(this[i], i, this)) return false;
    }
};

Array.prototype.myFlat = function (callback, depth = 0) {
    if (depth < 1 || !Array.isArray(array)) {
        return array;
    }

    return reduce(
        array,
        (result, current) => {
            return concat(result, flat(current, depth - 1));
        },
        []
    );
};

Array.prototype.myFlatMap = function (callback) {
    return flat(map(array, callback), 1);
};

Array.prototype.myIncludes = function (searchedValue) {
    return this.some(this, (value) => value === searchedValue);
};

Array.prototype.myConcat = function (...values) {
    const result = [...array];
    const { length } = values;

    for (let i = 0; i < length; i += 1) {
        const value = values[i];

        if (Array.isArray(value)) {
            push(result, ...value);
        } else {
            push(result, value);
        }
    }

    return result;
};

Array.prototype.myJoin = function (joinWith) {
    return reduce(
        this,
        (result, current, index) => {
            if (index === 0) {
                return current;
            }

            return `${result}${joinWith}${current}`;
        },
        ""
    );
};

Array.prototype.myReverse = function () {
    const result = [];

    const lastIndex = array.length - 1;

    for (let index = lastIndex; index > -1; index -= 1) {
        const value = array[index];
        result[lastIndex - index] = value;
    }

    return result;
};

Array.prototype.myShift = function () {
    const { length } = this;
    const firstValue = this[0];

    for (let index = 1; index < length; index += 1) {
        const value = this[index];
        this[index - 1] = value;
    }

    array.length = length - 1;

    return firstValue;
};

Array.prototype.myUnshift = function (...values) {
    const mergedArrays = concat(values, ...this);
    const { length: mergedArraysLength } = mergedArrays;

    for (let index = 0; index < mergedArraysLength; index += 1) {
        const value = mergedArrays[index];
        this[index] = value;
    }

    return array.length;
};

Array.prototype.mySlice = function (startIndex = 0, endIndex = this.length) {
    const result = [];

    for (let index = startIndex; index < endIndex; index += 1) {
        const value = this[index];

        if (index < this.length) {
            push(result, value);
        }
    }

    return result;
};

Array.prototype.mySplice = function (
    insertAtIndex,
    removeNumberOfElements,
    ...values
) {
    const firstPart = slice(this, 0, insertAtIndex);
    const secondPart = slice(this, insertAtIndex + removeNumberOfElements);

    const removedElements = slice(
        this,
        insertAtIndex,
        insertAtIndex + removeNumberOfElements
    );

    const joinedParts = firstPart.concat(values, secondPart);
    const { length: joinedPartsLength } = joinedParts;

    for (let index = 0; index < joinedPartsLength; index += 1) {
        this[index] = joinedParts[index];
    }

    this.length = joinedPartsLength;

    return removedElements;
};

Array.prototype.myPop = function () {
    const value = this[this.length - 1];
    this.length = this.length - 1;
    return value;
};

Array.prototype.myPush = function (...values) {
    const { length: arrayLength } = this;
    const { length: valuesLength } = values;

    for (let index = 0; index < valuesLength; index += 1) {
        this[arrayLength + index] = values[index];
    }

    return this.length;
};

Array.prototype.myFill = function (
    value,
    startIndex = 0,
    endIndex = this.length
) {
    for (let index = startIndex; index <= endIndex; index += 1) {
        this[index] = value;
    }

    return this;
};
