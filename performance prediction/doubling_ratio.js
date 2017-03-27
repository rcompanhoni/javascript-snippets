/**
 * Proxy to manage the stopwatch at the beginning and end of the target algorithm execution
 * http://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/DoublingRatio.java.html 
*/

"use strict";

var searching = require("searching.js");

function timeTrial(n) {
    var a = [];

    for (let i = 0; i < n; i++) {
        a[i] = Math.floor((Math.random() * Number.MAX_SAFE_INTEGER) + Number.MIN_SAFE_INTEGER);
    }

    console.time("timer");

    // TODO -- call target' function' being measured
    //ThreeSum.count(a);

    console.timeEnd("timer");

    return 0;    
}

// TODO - generate data 
// TODO - run searching.linearSearch 
// TODO - run searching.linearSearch
var prev = timeTrial(125);

for (let n = 250; true; n += n) {
    let time = timeTrial(n);
    
    let results = util.format("%7d %7.1f %5.1f\n", n, time, time/prev);
    console.log(results);

    prev = time;
} 
