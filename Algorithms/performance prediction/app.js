/*
    Proxy to manage the stopwatch at the beginning and end of the target algorithm execution
    http://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/DoublingRatio.java.html 

    TODO - this 'main' module must be responsible for generating the input -- refactoring:
        > 'bottom' method being exported in linearSearch and binarySearch should be in 'searching.js' and should receive a 'inputGenerator' function as an argument
           This new argument is the 'top' function in linear  and binary search files and should be here 

        > Same for threeSum, the module must export the functions and the 'executeThreeSum' and 'executeFastThreeSum' which should receive a inputGenerator as an argument. In this case
          the inputGenerator should read from the 'threeSumInputFiles' 
*/

"use strict";

var searching = require("./searching.js");
var util = require("util");

function verifyDoubleRating(timeTrial) {
    let prevHrtime = timeTrial(125);
    let prevRatio = 0;
    let nextSize = 0;

    for (let n = 250; true; n += n) {
        let currentHrtime = timeTrial(n);

        let ratio = prevHrtime === 0 ? 0 : Number((currentHrtime / prevHrtime).toFixed(1));
        let results = util.format("N=%d TIME=%d RATIO=%d", n, currentHrtime, ratio);

        console.log(results);

        prevHrtime = currentHrtime;

        if (ratio != 0 && ratio === prevRatio){
            prevRatio = ratio;
            nextSize = n + n;
            break;    
        }
        
        prevRatio = ratio;
    }

    var expected = nextSize * prevRatio;
    console.log("\nExpected for %d = %d", nextSize, expected);
    
    var realNext = timeTrial(nextSize);
    console.log("\nReal for %d = %d", nextSize, realNext);
}

console.log("Linear Search Measurements:\n");
verifyDoubleRating(searching.linearSearchTimeTrial);

// linearSearchMeasurements();

// console.log("\n#######################################\n");

// console.log("Binary Search Measurements:\n")
// binarySearchMeasurements();

// console.log("\n#######################################\n");
// console.log("Three Sum Measurements:\n")
// // TODO

// console.log("\n#######################################\n");
// console.log("Three Sum Fast Measurements:\n")
// TODO

// SIMPLE TESTS
// =============================================================================

// Searching
// var testArray = [0, 5, 10, 15, 20, 25, 30];
// console.log(searching.linearSearch(20, testArray)); // 4
// console.log(searching.binarySearch(25, testArray)); // 5


// TODO - ThreeSum