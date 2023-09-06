const resultElement = document.getElementById("result");

let inputString = "0";
let decimalFlag = 0;
let expressionArray = [];
let postfixExpression = [];
let tempStack = [];

//Could also use eval() to reduce the hassle but didn't want to.
function displayNumber(value){

    let lastInputValue = inputString[inputString.length - 1];

    if(!isNaN(value) && inputString === "0"){
        inputString = "";
    }

    if(value === "."){
        if(decimalFlag === 0){
            inputString = inputString.concat(value);
            resultElement.innerText = inputString;
            decimalFlag = 1;
            return;
        }else if(value === "."){
            return;
        }
    }

    if(value === "x" || value === "/" || value === "%" || value === "+" || value === "-"){
        decimalFlag = 0;
    }

    if((lastInputValue === "/" || lastInputValue === "x" || lastInputValue === "%" || lastInputValue === "+" || lastInputValue === "-") && (value === "x" || value === "/" || value === "%" || value === "+" || value === "-")){
        return;
    }

    inputString = inputString.concat(value);
    resultElement.innerText = inputString;
}

function back(){
    inputString = inputString.slice(0, -1);
    resultElement.innerText = resultElement.innerText.slice(0, -1);
}

//Clear Button
function clearFun(){
    resultElement.innerText = "0";
    inputString = "0";
    decimalFlag = 0;
    expressionArray = [];
    postfixExpression = [];
    tempStack = [];
}

//Equals Button
function equals(){

    let number = 0;
    let decimalNumber = 0;
    let decimalPlaces = 1;
    let resultNumber = 0;
    let index = 0;
    let toggleDecimal = 0;
   
    while(index < inputString.length){

        let toggleDecimal = 0;
        decimalPlaces = 1;

        while(!isNaN(inputString[index]) || inputString[index] === '.'){
            if(inputString[index] === '.'){
                toggleDecimal = 1;
                index++;
            }
            if(toggleDecimal){
                decimalNumber += Number(inputString[index])/Math.pow(10, decimalPlaces);
                decimalPlaces++;
                index++;
                continue;
            }
            number = (number*10) + Number(inputString[index]);
            index++;
        }

        number = number + decimalNumber;
        decimalNumber = 0;
        expressionArray.push(number);
        if(index < inputString.length){
            expressionArray.push(inputString[index]);
        }
        number = 0;
        index++;
    }

    infixToPostfix(expressionArray);
    resultNumber = calculate();
    resultElement.innerText = resultNumber;
    inputString = "0";
}

function infixToPostfix(expressionArray){
    let index = 0;
    while(index < expressionArray.length){
        if(!isNaN(expressionArray[index])){
            postfixExpression.push(expressionArray[index]);
        }else{
            switch(expressionArray[index]){
                case '+':
                    plusSub(expressionArray[index]);
                    break;

                case '-':
                    plusSub(expressionArray[index]);
                    break;

                case '/':
                    mulDivMod(expressionArray[index]);
                    break;

                case 'x':
                    mulDivMod(expressionArray[index]);
                    break;

                case '%':
                    mulDivMod(expressionArray[index]);
                    break;
            }
        }
        index++;
    }
    index = tempStack.length - 1;
    while(index >= 0){
        postfixExpression.push(tempStack[index]);
        index--;
    }
    tempStack = [];
}

function plusSub(exp){
    if(tempStack.length === 0){
        tempStack.push(exp);
    }
    else if(tempStack[tempStack.length - 1] === '+' || tempStack[tempStack.length - 1] === '-'){
        postfixExpression.push(tempStack[tempStack.length - 1]);
        tempStack.pop();
        tempStack.push(exp);
    }else{
        while(tempStack.length !== 0){
            postfixExpression.push(tempStack[tempStack.length - 1]);
            tempStack.pop();
        }
        tempStack.push(exp);
    }
}

function mulDivMod(exp){
    if(tempStack.length === 0 || tempStack[tempStack.length - 1] === '+' || tempStack[tempStack.length - 1] === '-'){
        tempStack.push(exp);
    }
    else if(tempStack[tempStack.length - 1] === 'x' || tempStack[tempStack.length - 1] === '/' || tempStack[tempStack.length - 1] === '%'){
        postfixExpression.push(tempStack[tempStack.length - 1]);
        tempStack.pop();
        tempStack.push(exp);
    }
}

function calculate(){
    let index = 0;
    while(index < postfixExpression.length){
        if(!isNaN(postfixExpression[index])){
            tempStack.push(postfixExpression[index]);
        }else{
            let first = tempStack.pop();
            let second = tempStack.pop();
            let result;
            switch(postfixExpression[index]){
                case '+':
                    result = second + first;
                    tempStack.push(result);
                    break;

                case '-':
                    result = second - first;
                    tempStack.push(result);
                    break;

                case 'x':
                    result = second * first;
                    tempStack.push(result);
                    break;

                case '/':
                    result = second / first;
                    tempStack.push(result);
                    break;

                case '%':
                    result = second % first;
                    tempStack.push(result);
                    break;
            }
        }
        index++;
    }
    return tempStack[tempStack.length - 1];
}