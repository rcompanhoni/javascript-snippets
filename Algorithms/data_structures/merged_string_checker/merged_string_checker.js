const input = 'codewars';
const part1 = 'cdw';
const part2 = 'oears';

const result = isMerge(input, part1, part2);

/*
  Indicates if part1 and part2 can be used to compose the input string -- part1 and part2 must have its chars in same order as input.

  @param {String} String to be checked
  @param {String} First part of the string.
  @param {String} Second part of the string.
  @returns {Boolean}
*/
function isMerge(input, part1, part2) {
  /* 
    const input = 'codewars';
    const part1 = 'cdw';
    const part2 = 'oears';

    Percorre part1 (indice do caractere da parte é menor ou igual ao índice do dicionário?)
        [c] = <0, true>
        [o] = <1, false>
        [d] = <2, true>
        [e] = <3, false>
        [w] = <4, true>
        [a] = <5, false>
        [r] = <6, false>
        [s] = <7, false>

      Quando ocorrer de um false ser convertido para um true, incrementa contador
      Ao final, o contador deverá ter o mesmo tamanho do input original
  */

  let inputChecked = input.split('').reduce((dic, char, index) => {
    dic[char] = {
      originalIndex: index,
      isSatisfied: false   
    }

    return dic;
  }, {}); 
  
  const counter = 0;
  for (let i = 0; i < arguments.length; i++) {
    counter = arguments.length[i].split('').reduce((counter, inputChar, index) => {
      const inputInfo = inputChecked[inputChar];
      if (inputInfo && (inputInfo.originalIndex >= index) && (!inputInfo.isSatisfied)) {
        inputInfo.isSatisfied = true;
        counter++;
      };
  
      return counter;
    }, 0);
  }

  return counter >= input.length;
};




