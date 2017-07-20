"use strict";

var searching = require("./searching.js");

function containsDuplicates(array) {
    return (new Set(array)).size !== array.length;
};

/**
 * Returns the number of triples in an array of distinct integers that
 * sum to 0. 
 *  
 *  This implementation uses a triply nested loop and takes proportional to n^3,
 *  where n is the number of integers.
 */
module.exports.threeSum = function(array) {
   const n = array.length;
   let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                if (array[i] + array[j] + array[k] == 0) {
                        count++;
                }
            }
        }
    }

    return count;
};

module.exports.executeThreeSum = function(array) {
   const n = array.length;
   let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                if (array[i] + array[j] + array[k] == 0) {
                        count++;
                }
            }
        }
    }

    return count;
};

/**
 *  Returns the number of triples in an array of distinct integers that
 *  sum to 0.
 *  
 *  This implementation uses sorting and binary search and takes time 
 *  proportional to n^2 log n, where n is the number of integers.
*/
module.exports.threeSumFast = function(array) {
    if (containsDuplicates(array)) throw new Error("array contains duplicate integers");
    
    array.sort();

    const n = a.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let k = searching.binarySearch(-(array[i] + array[j]), array);
                if (k > j) 
                    count++;
            }
    }

    return count;
};

