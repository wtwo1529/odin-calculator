
let firstNumber = null;
let firstNumberLength = 0;

let secondNumber = null;
let secondNumberLength = 0;

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

buttons.forEach((element) => {
    const value = element.value;
    const classes = element.classList;
    if (classes.contains("numbers")) {
        element.addEventListener('click', (event) => {
            if (firstNumber === null && operation === null) {
                firstNumber = Number(value);
                display.textContent += value;
            }
            else if (operation === null && secondNumber === null) {
                firstNumber = firstNumber * 10 + Number(value);
                display.textContent += value;
            }
            if (operation !== null && firstNumber !== null) {
                secondNumber = Number(value);
                display.textContent = value;
            }
            else if (secondNumber !== null) {
                seconcdNumber = secondNumber * 10 + Number(value);
                display.textContent += value;
            }
        });
    }
    else if (classes.contains("operand")) {
        element.addEventListener('click', (event) => {
            (operation === null) ? (display.textContent = "", operation = value) : console.log(false);
        })
    }
    else if (classes.contains("clear")) {
        element.addEventListener('click', (event) => {
            secondNumber = operation = null;
            firstNumber = 0;
            display.textContent = "0";
        })
    }
    else if (classes.contains("equal")) {
        element.addEventListener('click', function(event) {
            if (operation !== null && firstNumber !== null)
            {
                let result = operate(operation, firstNumber, secondNumber);
                display.textContent = result;
                firstNumber = result;
                secondNumber = operation = null;    
            }
        });
    }
})