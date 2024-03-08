
let firstNumber = null;
let firstNumberLength = 0;
let firstNumberDecimal = false;
let firstNumberDepth = 1;

let secondNumber = null;
let secondNumberLength = 0;
let secondNumberDecimal = false;
let secondNumberDepth = 1;

let operation = null;
let lastOperation = null;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const mod = (a, b) => a % b;

const operate = (operation, firstNumber, secondNumber) => {
    return (operation == "+") ? add(firstNumber, secondNumber) : (operation == "-") ?
    subtract(firstNumber, secondNumber) : (operation == "x") ? multiply(firstNumber, secondNumber) : (operation = "÷") ?
    divide(firstNumber, secondNumber) : mod(firstNumber, secondNumber);
}

const display = document.querySelector(".display p");
const buttons = document.querySelectorAll("button");

buttons.forEach((element) => 
    {
        const value = element.value;
        const classes = element.classList;
        if (classes.contains("numbers")) 
        {
            element.addEventListener('click', (event) => 
            {
                if (firstNumber === null && operation === null) 
                {
                    firstNumber = Number(value);
                    display.textContent += value;
                }
                else if (operation === null && secondNumber === null && firstNumber == 0) 
                {
                    firstNumber = Number(value);
                    display.textContent = value;
                }
                else if (operation === null && secondNumber === null && firstNumberDecimal == false) 
                {
                    firstNumber = firstNumber * 10 + Number(value);
                    display.textContent += value;
                }
                else if (operation === null && secondNumber === null && firstNumberDecimal == true) 
                {
                    firstNumber += Number(value) / (10 ** firstNumberDepth);
                    firstNumberDepth++;
                    display.textContent += value;  
                }
                if (operation !== null && firstNumber !== null && secondNumber === null) 
                {
                    secondNumber = Number(value);
                    display.textContent = value;
                }
                else if (secondNumber !== null && secondNumberDecimal == false) 
                {
                    secondNumber = secondNumber * 10 + Number(value);
                    display.textContent += value;
                }
                else if (secondNumber !== null && secondNumberDecimal == true) 
                {
                    secondNumber += Number(value) / (10 ** secondNumberDepth);
                    secondNumberDepth++;
                    display.textContent += value;  
                }
            });
        }
        else if (classes.contains("operand")) 
        {
            element.addEventListener('click', (event) => 
            {
                (operation === null) ? (display.textContent = "", operation = value, event.target.classList.add("pressed")) : console.log(false);
            })
        }
        else if (classes.contains("clear")) 
        {
            element.addEventListener('click', (event) => 
            {
                secondNumber = operation = null;
                firstNumber = 0;
                display.textContent = "0";
                firstNumberDecimal = false;
                secondNumberDecimal = false;
                firstNumberDepth = 1;
                secondNumberDepth = 1;
            })
        }
        else if (classes.contains("equal")) 
        {
            element.addEventListener('click', function(event) 
            {
                if (operation !== null && firstNumber !== null && secondNumber !== null)
                {
                    let result = operate(operation, firstNumber, secondNumber);
                    display.textContent = result;
                    
                    let pressed = document.getElementsByClassName('pressed');
                    for (button of pressed) 
                    {
                        button.classList.remove('pressed')
                    }
                    firstNumber = result;
                    secondNumber = operation = null;   
                    firstNumberDecimal = false;
                    secondNumberDecimal = false; 
                    firstNumberDepth = String(firstNumber).split('').reduce(
                        (total, currentItem) => 
                        {
                            return total + 1;
                        }
                    , 0);
                    secondNumberDepth = 1;
                    
                }
            });
        }
        else if (classes.contains("decimal")) 
        {
            element.addEventListener('click', (event) => 
            {
                if (secondNumber === null && operation === null && firstNumberDecimal == false) 
                {
                    firstNumberDecimal = true;
                    display.textContent += value;
                }
                else if (operation !== null && firstNumber !== null && secondNumberDecimal == false) 
                {
                    secondNumberDecimal = true;
                    display.textContent += value;
                }
            })
        }
        else if (classes.contains("delete")) 
        {
            element.addEventListener('click', (event) => 
            {
                if (firstNumber !== null && operation === null && secondNumber === null) {
                    let array = firstNumber.toString().split('.');
                    let newValue; 
                    if (array.length > 1)
                    {
                        let nonDecimalArray = array[0].split('');
                        let decimalArray = array[1].split('');
                        decimalArray.pop();
                        let decimal = Math.round(Number(decimalArray.join('')));
                        let nonDecimal = Number(nonDecimalArray.join(''));
                        let decimalPart = parseFloat(decimal * (10 ** (-1 * (decimalArray.length)))).toFixed(firstNumberDepth-1)
                        console.log(`${decimal} ${nonDecimal} ${decimalPart}`);
                        newValue = nonDecimal + parseFloat(decimalPart);
                        console.log(newValue);
                    }
                    else {
                        let nonDecimalArray = array[0].split('');
                        nonDecimalArray.pop();
                        let nonDecimal = Number(nonDecimalArray.join(''));
                        newValue = nonDecimal;
                    }
                    display.textContent = newValue;
                    firstNumber = newValue;
                    if (firstNumber == 0) {
                        firstNumber = 0;
                    }
                }
                else if (firstNumber !== null && operation !== null & secondNumber !== null)
                {
                    let array = secondNumber.toString().split('.');
                    let newValue; 
                    if (array.length > 1)
                    {
                        let nonDecimalArray = array[0].split('');
                        let decimalArray = array[1].split('');
                        decimalArray.pop();
                        let decimal = Number(decimalArray.join(''));
                        let nonDecimal = Number(nonDecimalArray.join(''));
                        let decimalPart = parseFloat(decimal * (10 ** (-1 * (decimalArray.length)))).toFixed(firstNumberDepth)
                        newValue = nonDecimal + parseFloat(decimalPart);
                    }
                    else {
                        let nonDecimalArray = array[0].split('');
                        let nonDecimal = Number(nonDecimalArray.join(''));
                        nonDecimalArray.pop();
                        newValue = nonDecimal;
                    }
                    secondNumber = newValue;
                    if (secondNumber == 0) {
                        secondNumber = 0;
                    }
                    display.textContent = newValue;
                }
            }
        )}
    }
);