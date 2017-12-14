/*
    Write some code, that will flatten an array of arbitrarily nested arrays of integers into a flat array of integers. e.g. [[1,2,[3]],4] -> [1,2,3,4]. 
*/

function flattenArray(array) {
    // if no elements are arrays, just return it
    if (!array.some(item => item instanceof Array)) {
        return array;
    } else {
        return array.reduce((result, item) => {
            if (item instanceof Array) {
                return result.concat(flattenArray(item)); // concat items that are subarrays
            } else {
                result.push(item); // push simple integers
            }

            return result;
        }, []);
    }
}

const test1 = [1, [2, 3], 4];
console.log(flattenArray(test1));

const test2 = [[[1,2,3,4]]];
console.log(flattenArray(test2));

const test3 = [[1], [2], [3], [4]];
console.log(flattenArray(test3));

const test4 = [[1,2,[3]],4];
console.log(flattenArray(test4));