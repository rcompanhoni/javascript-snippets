/*
    Proxy to manage the stopwatch at the beginning and end of the target algorithm execution
    http://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/DoublingRatio.java.html 
*/

"use strict";

var linearSearchMeasurements = require("./linearSearchMeasurements.js");
var binarySearchMeasurements = require("./binarySearchMeasurements.js");

console.log("Linear Search Measurements:\n")
linearSearchMeasurements();

console.log("\n#######################################\n");

console.log("Binary Search Measurements:\n")
binarySearchMeasurements();

// SIMPLE TEST
// =============================================================================

// var testArray = [0, 5, 10, 15, 20, 25, 30];
// console.log(searching.linearSearch(20, testArray)); // 4
// console.log(searching.binarySearch(25, testArray)); // 5

