const checkEdgeCases = (calcCheck = '') =>  {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const edgeCases = ['++', '+/', '/+', '+*', '*+', '-*', '-/', '**', '*/', '/*', '**', '//', '-+'];
  const operations = ['+', '/', '*'];
  // check for single parenthesis
  if(calcCheck.includes('(') && !calcCheck.includes(')')){
    return false
  }else if(!calcCheck.includes('(') && calcCheck.includes(')')){
    return false
  }
  // check for letter characters
  for(let i = 0; i < alphabet.length; i++){
    if(calcCheck.includes(alphabet[i])){
      i = alphabet.length - 1;
      return false;
    };
  };

  // check for irregular combinations of operations
  for(let i = 0; i < edgeCases.length; i++){
    if(calcCheck.includes(edgeCases[i])){
      return false;
    };
  };

  // check for operations at the start and end oof string
  // a negavtive string is acceptable only at the beginning
  for(let i = 0; i < operations.length; i++){
    if(calcCheck[calcCheck.length - 1] === '-' || calcCheck[0] === operations[i] || calcCheck[calcCheck.length -1] === operations[i]){
      return false;
    }
  }
  return true
}

const splitElements = (calcInput = '') => {
  let digits = '0123456789.';
  let newCalcInput = [];
  let start = 0;
  let digitStr = '';
  let splitInput = '';

  if(calcInput.includes(' ')){
    splitInput = calcInput.split(' ').join('');
  }else{
    splitInput = calcInput;
  }

  for(let i = 0; i < splitInput.length; i++){
    if(digits.includes(splitInput[i])){
      digitStr += splitInput[i];
    }else{
      newCalcInput.push(digitStr);
      newCalcInput.push(splitInput[i]);
      start = i;
      digitStr = '';
    }
  }
  // push remaining digits
  if(start + 1 < splitInput.length){
    newCalcInput.push(splitInput.substring(start + 1, splitInput.length))
  }

  // clear ''
  for(let i = 0; i < newCalcInput.length; i++){
    if(newCalcInput[i] === ''){
      newCalcInput.splice(i,1);
    }
  };
  return newCalcInput

}
// splitElements("(9/3)*2*5/10")
// splitElements('90/3*2+10*2-0*')

const formatParens = (calcInput = []) => {
  const parenthesis = [')', '(']
  for(let i = 0; i < calcInput.length; i++){
    if(calcInput[i] === parenthesis[0] && calcInput[i+1] === parenthesis[1]){
      calcInput.splice(i+ 1, 0, '*')
      i++
    }
  }
  return calcInput
}

const formatNegative = (calcInput = []) => {
  for(let i = 0; i < calcInput.length; i++){
    if(calcInput[i] === '-' && typeof parseInt(calcInput[i+1]) === 'number'){
      calcInput.splice(i, 2, `-${calcInput[i+1]}`)
    }
  }

  for(let i = 0; i < calcInput.length; i++){
    if(typeof parseInt(calcInput[i]) === 'number' && Math.sign(parseInt(calcInput[i+1])) === -1){
      calcInput.splice(i+1, 0, '+')
      i++
    }
  }

  return calcInput
}

const operations = (operator = '', firstInput = '', secondInput = '') => {
  let num1 = parseFloat(firstInput)
  let num2 = parseFloat(secondInput)
  if(operator === '+'){
    return (num1 + num2).toString();

  }else if(operator === '-'){
    return (num1 - num2).toString();

  }else if(operator === '*'){
    return (num1 * num2).toString();

  }else if(operator === '/'){
    return (num1 / num2).toString();
  }
}

const pemdas = (calcArray = [], ) => {
  const typesOperations = ['*', '/', '+', '-'];
  if(calcArray.includes(typesOperations[0]) || calcArray.includes(typesOperations[1])){
    for(let i = 0; i < calcArray.length; i++){
      if(calcArray[i] === typesOperations[0]){
        let value = operations('*', calcArray[i - 1], calcArray[i +1]);
        calcArray.splice(i - 1, 3, value);
        i = 0;
      }else if(calcArray[i] === typesOperations[1]){
        let value = operations('/', calcArray[i - 1], calcArray[i +1]);
        calcArray.splice(i - 1, 3, value);
        i = 0;
      }

    }
  }

  if(calcArray.includes(typesOperations[2]) || calcArray.includes(typesOperations[3])){
    for(let i = 0; i < calcArray.length; i++){
      if(calcArray[i] === typesOperations[2]){
        let value = operations('+', calcArray[i - 1], calcArray[i +1]);
        calcArray.splice(i - 1, 3, value);
        i = 0;
      }else if(calcArray[i] === typesOperations[3]){
        let value = operations('-', calcArray[i - 1], calcArray[i +1]);
        calcArray.splice(i - 1, 3, value);
        i = 0;
      }

      if(!calcArray.includes(typesOperations[2]) && !calcArray.includes(typesOperations[3])){
        i = calcArray.length;
      }
    }
  }
  return calcArray[0];
};

