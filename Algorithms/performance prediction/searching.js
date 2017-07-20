"use strict";

// LINEAR SEARCH
// =============================================================================

var linearSearch = function(value, array) {
    for(let i = 0; i < array.length; i++) {
        if (array[i] === value)
            return i;
    }

    return -1;
};

var linearSearchTimeTrial = function(n) {
    let testArray = [];

    // generates an array with random elements
    for (let i = 0; i < n; i++) {
        testArray[i] = Math.floor((Math.random() * Number.MAX_SAFE_INTEGER));
    }

    // element to find
    let middleIndex = Math.floor((testArray.length - 1) / 2);
    let valueToFind = testArray[middleIndex];

    // measuring execution time
    var hrstart = process.hrtime();
    linearSearch(valueToFind, testArray)
    var hrend = process.hrtime(hrstart);

    return hrend[1];
};

module.exports.linearSearch = linearSearch;
module.exports.linearSearchTimeTrial = linearSearchTimeTrial;

// BINARY SEARCH
// =============================================================================

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