var fs = require('fs');
var path = require('path');

var file = path.join(__dirname, 'input.txt');

fs.readFile(file, function (err, contents) {
      if (err) {
          return console.log(err)
      }

      main(contents);
});

function main(contents) {
    const lines = contents.toString().split(/\r?\n/);
    
    const n = lines[0];
    const bracketsArray = lines.splice(1);

    const result = balancedBrackets(n, bracketsArray);
    result.map(answer => console.log(answer));
}

function balancedBrackets(n, bracketsArray) {
    return bracketsArray.reduce((result, expression) => {
        const currentResult = isBalanced(expression) ? 'YES' : 'NO';
        result.push(currentResult);
        return result;
    }, []);
}

function isBalanced(expression) {
    let stack = [];

    for (let bracket of expression.split('')) {
        if      (bracket == '{') stack.push('}');
        else if (bracket == '[') stack.push(']');
        else if (bracket == '(') stack.push(')');
        else {
            if (stack.length == 0 || bracket !== stack[stack.length - 1]) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0;
}




