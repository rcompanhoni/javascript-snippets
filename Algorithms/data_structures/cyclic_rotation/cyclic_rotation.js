function solution(A, K) {
    for(let i = 0; i < K; i++) {
        let element = A.pop();
        A.unshift(element);
    }

    return A;
}

// for example, given array A = [3, 8, 9, 7, 6] and K = 3, the function should return [9, 7, 6, 3, 8].
let A = [3, 8, 9, 7, 6];
let K = 3;
console.log(solution(A, K));


