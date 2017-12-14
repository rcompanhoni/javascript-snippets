const inputA = ['2', '1', '+', '3', '*'];
const resultA = evaluateReversePolishNotation(inputA);

const inputB = ['4', '13', '5', '/', '+'];
const resultB = evaluateReversePolishNotation(inputB);

console.log(resultA);
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
    Evaluates from left to right. Every time it meets a number it simply pushes it to the stack. When it meets an operator then it pops
    the last two values, perform the operation on them, and push the result back on the stack. Examples:

    2, 1, +, 3, * 
    [2] --> [2, 1] --> [3] --> [3,3] --> 9

    4, 13, 5, /, +
    [4] --> [4, 13] --> [4,13,5] --> [4,2] --> 6
*/
function evaluateReversePolishNotation(tokens) {
  var stack = [];

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (isOperation(token)) {
      var number1 = stack.pop();
      var number2 = stack.pop();
      var result = performOperation(token, number2, number1);
      stack.push(result);
    } else {
      stack.push( parseInt(tokens[i], 10) );
    }
  }

  return stack.pop();
}




