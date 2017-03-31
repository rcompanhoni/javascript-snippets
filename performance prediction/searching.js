"use strict";

module.exports.linearSearch = function(value, array) {
    for(let i = 0; i < array.length; i++) {
        if (array[i] === value)
            return i;
    }

    return -1;
};

module.exports.binarySearch = function(value, array, bottom = 0, top = (array.length - 1)) {
    if (top < bottom){
        return -1;
    }

    let middle = Math.floor((top + bottom) / 2);

    if (array[middle] === value)
        return middle;

    if (value < array[middle])
        return this.binarySearch(value, array, bottom, middle - 1);
    else 
        return this.binarySearch(value, array, middle + 1, top);
};