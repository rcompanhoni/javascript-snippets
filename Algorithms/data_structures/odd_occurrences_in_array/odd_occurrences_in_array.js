function solution(A) {
    for(let i = 0; i < A.length; i++) {
        if (A[i] !== null) {
            let element = A[i];
            A[i] = null;

            let matchIndex = A.indexOf(element);
            if (matchIndex >= 0) {
                A[matchIndex] = null;
            } else {
                return element;
            }
        }
    }
}

let test = [9,3,9,3,9,7,9];
console.log(solution(test));

test = [10,5,10];
console.log(solution(test));

test = [10,5,10,3,6,6,120,120,5];
console.log(solution(test));



