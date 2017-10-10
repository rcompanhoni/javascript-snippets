function solution(N) {
    let binary = decimalToBinary(N);

    let gaps = binary.split(1);

    let binaryGap = 0;
    gaps.map(gap => {
        const currentGap = gap.length;

        if (currentGap > binaryGap)
            binaryGap = currentGap;
    });

    return binaryGap;

    function decimalToBinary(value) {
        let result = [];
    
        do {
            let digit = Math.floor(value % 2); 
            result.unshift(digit);
            value = Math.floor(value / 2);
        } while(value > 1)

        result.unshift(value);
        return result.join('');
    }
}

console.log(solution(1041));




