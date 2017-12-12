/* 
  Write a program that will correct an input string to use proper capitalization and spacing. 
  Allowed punctuations are the period ( . ), question mark ( ? ), and exclamation ( ! ). Make sure that single space always follows 
  commas ( , ), colons ( : ), semicolons ( ; ) and all other punctuation. The input string will be a valid English sentence.

  Example: "first, solve the problem.then, write the code."
  Output: "First, solve the problem. Then, write the code."

  Example: "this is a test... and another test."
  Output: "This is a test... And another test."
*/

function removeDiacritics(S) {
  const splitted = S.split(new RegExp('[,.]', 'g'));

  // capitalize first word
  const firstWord = splitted[0];
  const capitalized = firstWord.split('')[0].toUpperCase();
  splitted[0] = `${capitalized}${firstWord.slice(1)}`;

  let delimiters = [',', '.'];
  let lastDelimiter = false;
  
  const result = splitted.reduce((aggregation,word) => {
    if (lastDelimiter) {
      aggregation += ` ${word}`;
    } else {
      aggregation += word;
    }

    let lastChar = word.split('')[word.length - 1];
    lastDelimiter = delimiters.some(c => c === lastChar);

    return aggregation;
  },'');
  
  console.log(result);
}

removeDiacritics("first, solve the problem.then, write the code.");
removeDiacritics("This is a test... And another test.");