// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size)); // if index + size is greater than the last element index then slice will return from (index, last index) and it will not cause an 'out of bounds' error
    index += size;
  }

  return chunked;
}

function chunk(array, size) {
  // create an empty array to hold chunks (i.e. subarrays)
  const chunked = [];

  // for each  element in the original array
  for (let element of array) {
    //  retrieve the last chunk previously added (i.e. subarray)
    const last = chunked[chunked.length - 1];

    // if it's the first chunk or if the last added chunk is already full
    // then create a new chunk(subarray) initialized with the current element
    if (!last || last.length === size) {
      chunked.push([element]);
    } else {
      // otherwise the last retrieved chunk is not full yet so just
      // add the current element to it
      last.push(element);
    }
  }

  return chunked;
}

module.exports = chunk;
