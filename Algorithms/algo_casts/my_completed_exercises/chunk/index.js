// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) // [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) // [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) // [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) // [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) // [[ 1, 2, 3, 4, 5]]

// problem: uses 'splice' which modifies the original array
function myChunk(array, size) {
    if (array.length <= size) {
        return array;
    }

    let chunkable = true;
    let chunks = [];
    do {
        chunks.push(array.splice(0, size));

        if (array.length <= size) {
            chunks.push(array);
            chunkable = false;
        }

    } while (chunkable);

    return chunks;
}

// not ideal: it does not use 'slice'
function chunk(array, size) {
  const chunked = [];

  for (let element of array) {
    const last = chunked[chunked.length - 1];

    if (!last || last.length === size) {
      chunked.push([element]);
    } else {
      last.push(element);
    }
  }

  return chunked;
}

// uses 'slice' which doesn't modify the original array -- also, notice that there is no problem when the 'end' argument is out-of-bounds (it simply slice from 'start' to 'end')
function chunk2(array, size) {
    const chunked = [];
    let index = 0;
  
    while (index < array.length) {
      chunked.push(array.slice(index, index + size));
      index += size;
    }
  
    return chunked;
  }

module.exports = chunk2;
