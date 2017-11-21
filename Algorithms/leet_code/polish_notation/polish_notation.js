// const inputA = ['-', '5', '*', '6', '7'];
// const resultA = evaluatePolishNotation(inputA);

//× ÷ 15 − 7 + 1 1 3 + 2 + 1 1
const inputB = ['-', '*', '/', '15', '-', '7', '+', '1', '1', '3', '+', '2', '+', '1', '1'];
const resultB = evaluatePolishNotation(inputB);

//console.log(resultA);
console.log(resultB);

/*
  Function to perform operation with two numbers.

  @param {String} Operation type.
  @param {Number} Number 1.
  @param {Number} Number 2.
  @returns {Number} Result of performing the operation.
*/
function performOperation(operation, num1, num2) {
    switch (operation) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return ~~(num1 * num2);
        case '/': return ~~(num1 / num2);
        default: console.error('Unknown operation: ', operation);
    }
};

/*
  Function to check if variable holds an operation type.

  @param {Any} Token.
  @returns {Boolean} If token is string with operation type.
*/
function isOperation(token) {
    // map of supported operations
    var map = {
        '+': true,
        '-': true,
        '*': true,
        '/': true
    }
    return !!map[token];
};


/*
    Evaluates from right to left. Every time it meets a number it simply pushes it to the stack. When it meets an operator then it pops
    the last two values, perform the operation on them, and push the result back on the stack. Examples:

    − 5 × 6 7
    [7] --> [6, 7] --> [42] --> [5 42] --> [-37]

    - × ÷ 15 − 7 + 1 1 3 + 2 + 1 1
*/
function evaluatePolishNotation(tokens) {
  var stack = [];

  for (var i = tokens.length - 1; i >= 0 ; i = i - 1) {
    var token = tokens[i];

    if (isOperation(token)) {
      var number1 = stack.pop();
      var number2 = stack.pop();
      var result = performOperation(token, number1, number2);
      stack.push(result);
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack.pop();
}




