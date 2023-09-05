const resultElement = document.getElementById("result");

const zeroElement = document.getElementById("zero");
const oneElement = document.getElementById("one");
const twoElement = document.getElementById("two");
const threeElement = document.getElementById("three");
const fourElement = document.getElementById("four");
const fiveElement = document.getElementById("five");
const sixElement = document.getElementById("six");
const sevenElement = document.getElementById("seven");
const eightElement = document.getElementById("eight");
const nineElement = document.getElementById("nine");

const clearElement = document.getElementById("clear");
const percentageElement = document.getElementById("percentage");
const divideElement = document.getElementById("divide");
const multiplyElement = document.getElementById("multiply");
const subtractElement = document.getElementById("subtract");
const plusElement = document.getElementById("plus");
const dotElement = document.getElementById("dot");
const equalsElement = document.getElementById("equals");

const numberElementArray = [zeroElement, oneElement, twoElement, threeElement, fourElement, fiveElement, sixElement, sevenElement, eightElement, nineElement, percentageElement, divideElement, multiplyElement, subtractElement, plusElement, dotElement];

let inputNumberArray = [];  //Stores array of digits

let wholeNumberArray = [];  //Stores all the input numbers

let wholeNumber;            //Stores a full number

let number = 0;             //Stores the number operandIndexust to display it

let inputString = "0";

let operatorArray = [];

let flag = 0;


//Add event listener to all the numbered buttons
numberElementArray.forEach((e)=>{
    e.addEventListener('click', ()=>{
        wholeNumberArray.pop(wholeNumber);
        inputNumberArray.push(Number(e.innerText));
        let value = e.innerText;
        contNumber(value);
        wholeNumberArray.push(wholeNumber);
    })
});

//Add Number according to place
function contNumber(value){

    let lastInputValue = inputString[inputString.length - 1];

    if(!isNaN(value) && inputString === "0"){
        inputString = "";
    }

    if(value === "."){
        if(flag === 0){
            inputString = inputString.concat(value);
            resultElement.innerText = inputString;
            flag = 1;
            return;
        }else if(value === "."){
            return;
        }
    }

    if(value === "x" || value === "/" || value === "%" || value === "+" || value === "-"){
        flag = 0;
    }

    if((lastInputValue === "/" || lastInputValue === "x" || lastInputValue === "%" || lastInputValue === "+" || lastInputValue === "-") && (value === "x" || value === "/" || value === "%" || value === "+" || value === "-")){
        return;
    }

    inputString = inputString.concat(value);
    resultElement.innerText = inputString;
}

//Clear Button
clearElement.addEventListener('click', ()=>{
    resultElement.innerText = "0";
    inputString = "0";
    operatorArray = [];
})

equalsElement.addEventListener('click', ()=>{
    let number = 0;
    let decimalNumber = 0;
    let decimalPlaces = 1;
    let resultNumber = 0;
    let numberArray = [];
    let index = 0;
    let operandIndex = 0;
    let toggleDecimal = 0;
    console.log(inputString);

    while (operandIndex < inputString.length){
        if(isNaN(inputString[operandIndex])){
            if(inputString[operandIndex] !== "."){
                operatorArray.push(inputString[operandIndex]);
                operandIndex++;
            }else{
                operandIndex++;
            }
        }
        operandIndex++;
    }

    operandIndex = 0;
    
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
                console.log({decimalNumber});
                decimalPlaces++;
                index++;
                continue;
            }
            number = (number*10) + Number(inputString[index]);
            index++;
        }

        number = number + decimalNumber;
        decimalNumber = 0;
        numberArray.push(number);
        number = 0;
        console.log({numberArray});
        index++;
        
        if(numberArray.length === 2){
            console.log(operatorArray[operandIndex]);
            switch(operatorArray[operandIndex]){
                case "+":
                    resultNumber = 0;
                    numberArray.forEach((e)=>{
                        resultNumber += e;
                    });
                    numberArray = [];
                    numberArray.push(resultNumber);
                    console.log({numberArray});
                    break;

                case "-":
                    resultNumber = 0;
                    resultNumber += numberArray[0];
                    resultNumber = resultNumber - numberArray[1];
                    numberArray = [];
                    numberArray.push(resultNumber);
                    console.log({numberArray});
                    break;

                case "x":
                    resultNumber = 1;
                    numberArray.forEach((e)=>{
                        resultNumber *= e;
                    });
                    numberArray = [];
                    numberArray.push(resultNumber);
                    console.log({numberArray});
                    break;

                case "/":
                    resultNumber = 1;
                    resultNumber = numberArray[0];
                    resultNumber = resultNumber/numberArray[1];
                    numberArray = [];
                    numberArray.push(resultNumber);
                    console.log({numberArray});
                    break;

                case "%":
                    resultNumber = 0;
                    resultNumber = numberArray[0];
                    resultNumber = resultNumber % numberArray[1];
                    numberArray = [];
                    numberArray.push(resultNumber);
                    console.log({numberArray});
            }
            operandIndex++;
        }
    }

    console.log({operatorArray});
    resultElement.innerText = resultNumber;
});