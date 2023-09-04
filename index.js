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

const numberElementArray = [zeroElement, oneElement, twoElement, threeElement, fourElement, fiveElement, sixElement, sevenElement, eightElement, nineElement, percentageElement, divideElement, multiplyElement, subtractElement, plusElement];

let inputNumberArray = [];  //Stores array of digits

let wholeNumberArray = [];  //Stores all the input numbers

let wholeNumber;            //Stores a full number

let number = 0;             //Stores the number just to display it

let inputString = "0";


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
    if(!isNaN(value) && inputString === "0"){
        inputString = "";
    }
    if((inputString[inputString.length - 1] === "/" || inputString[inputString.length - 1] === "x" || inputString[inputString.length - 1] === "%" || inputString[inputString.length - 1] === "+" || inputString[inputString.length - 1] === "-") && (value === "x" || value === "/" || value === "%" || value === "+" || value === "-")){
        return;
    }
    inputString = inputString.concat(value);
    resultElement.innerText = inputString;
}

//Clear Button
clearElement.addEventListener('click', ()=>{
    resultElement.innerText = "0";
    inputString = "0";
})

equalsElement.addEventListener('click', ()=>{
    let number = 0;
    let resultNumber = 0;
    let numberArray = [];
    let i = 0;
    let j = 0;
    while(i < inputString.length){

        while(!isNaN(inputString[i])){
            number = (number*10) + Number(inputString[i]);
            i++;
            j++;
        }

        if(isNaN(inputString[j])){
            value = inputString[j];
            console.log({value});
        }
        
        numberArray.push(number);
        number = 0;
        i++;

        if(numberArray.length === 2 && value === "+"){
            resultNumber = 0;
            numberArray.forEach((e)=>{
                resultNumber += e;
            });
            numberArray = [];
            numberArray.push(resultNumber);
            console.log({numberArray});
        }
        
        if(numberArray.length === 2 && value === "x"){
            resultNumber = 1;
            numberArray.forEach((e)=>{
                resultNumber *= e;
            });
            numberArray = [];
            numberArray.push(resultNumber);
            console.log({numberArray});
        }

        if(numberArray.length === 2 && value === "/"){
            resultNumber = 1;
            resultNumber = numberArray[0]/resultNumber;
            resultNumber = resultNumber/numberArray[1];
            numberArray = [];
            numberArray.push(resultNumber);
            console.log({numberArray});
        }

        if(numberArray.length === 2 && value === "-"){
            resultNumber = 0;
            resultNumber += numberArray[0];
            resultNumber = resultNumber - numberArray[1];
            numberArray = [];
            numberArray.push(resultNumber);
            console.log({numberArray});
        }

        if(numberArray.length === 2 && value === "%"){
            resultNumber = 0;
            resultNumber = numberArray[0];
            resultNumber = resultNumber % numberArray[1];
            numberArray = [];
            numberArray.push(resultNumber);
            console.log({numberArray});
        }
    }
    resultElement.innerText = resultNumber;
});