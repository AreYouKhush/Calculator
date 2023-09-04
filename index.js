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

const numberElementArray = [zeroElement, oneElement, twoElement, threeElement, fourElement, fiveElement, sixElement, sevenElement, eightElement, nineElement];

let inputNumberArray = [];  //Stores array of digits

let wholeNumberArray = [];  //Stores all the input numbers

let resultNumber = 0;       //Stores the result

let wholeNumber;            //Stores a full number

let number = 0;             //Stores the number just to display it

let numberWithOperator = "";

//Add Number according to place
function contNumber(value){
    inputNumberArray.forEach((value)=>{
        number = (number*10) + value;
    })
    resultElement.innerText = number;
    wholeNumber = number;
    number = 0;
}

//Add event listener to all the numbered buttons
numberElementArray.forEach((e)=>{
    e.addEventListener('click', ()=>{
        wholeNumberArray.pop(wholeNumber);
        inputNumberArray.push(Number(e.innerText));
        let value = e.innerText;
        contNumber(value);
        wholeNumberArray.push(wholeNumber);
        console.log(wholeNumberArray);
    })
});

//Clear Button
clearElement.addEventListener('click', ()=>{
    resultElement.innerText = "";
    inputNumberArray = [];
    wholeNumberArray = [];
})

//Plus Button
plusElement.addEventListener('click', ()=>{
    operations('plus');
    wholeNumberArray.push(wholeNumber);
    console.log(wholeNumberArray);
    wholeNumber = 0;
    inputNumberArray = [];
})

//Equals Button
equalsElement.addEventListener('click', ()=>{
    resultElement.innerText = resultNumber;
    resultNumber = 0;
    inputNumberArray = [];
})

function operations(operation){
    switch(operation){
        case 'plus':
            wholeNumberArray.forEach((e)=>{
                resultNumber += e;
                console.log({e, resultNumber});
            });
            break;
    }
}