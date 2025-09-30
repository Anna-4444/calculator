const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const display = document.querySelector(".display");

let number1 = "";
let operator = "";
let number2 = "";
let result = "";
let haveNumber1 = false;

// Decimal button
document.querySelector(".decimal").addEventListener("click", handleDecimalClick);

function handleDecimalClick() { 
    if (!haveNumber1) {
        if (number1 === "") return;
        if (!number1.includes(".")){
            number1 += ".";
            display.innerText = `${number1}`;
        } 
    } else if (haveNumber1) {
        if (number2 === "") return;
        if (!number2.includes(".")){
            number2 += ".";
            display.innerText = `${number1} ${operator} ${number2}`;
        } 
    }      
}

// Positive-negative button
document.querySelector(".pos-neg").addEventListener("click", handlePosNegClick);

function handlePosNegClick() {
    if (!haveNumber1) {
        if (number1 === "") return;
        if (number1.charAt(0) === "-") {
            number1 = number1.slice(1);
            display.innerText = `${number1}`;
        } else {
            number1 = "-" + number1;
            display.innerText = `${number1}`;
        }
    } else if (haveNumber1) {
        if (number2 === "") return;
        if (number2.charAt(0) === "-") {
            number2 = number2.slice(1);
            display.innerText = `${number2}`;
        } else {
            number2 = "-" + number2;
            display.innerText = `${number1} ${operator} ${number2}`;
        }
    }      
}

// Percent button
document.querySelector(".percent").addEventListener("click", handlePercentClick);

function handlePercentClick(){
    if (!haveNumber1) {
        if (number1 === "") return;
        number1 = (number1 / 100).toString();
        display.innerText = `${number1}`;
    } else if (haveNumber1) {
        if (number2 === "") return;
        number2 = (number2 / 100).toString();
        display.innerText = `${number1} ${operator} ${number2}`;
    }
}

// Backspace button
document.querySelector(".backspace").addEventListener("click", handleBackspace);

function handleBackspace(){
    if (!haveNumber1) {
        if (number1 === "") return;
        number1 = number1.slice(0, number1.length - 1);
        display.innerText = `${number1}`;
    } else if (haveNumber1) {
        if (number2 === "") return;
        number2 = number2.slice(0, number2.length - 1);
        display.innerText = `${number1} ${operator} ${number2}`;
    }
}

// Clear button
document.querySelector(".clear").addEventListener("click", handleClear);

function handleClear() {
    display.innerText = "";
    number1 = "";
    operator = "";
    number2 = "";
    result = "";
    haveNumber1 = false;
}

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener("click", handleNumberButtonClick)
})

function handleNumberButtonClick(e) {
    clearOperatorHighlight()
    if (display.innerText.length >= 15) return;
    const value = e.target.value;
    if (!haveNumber1) {
        number1 += value;
        display.innerText = `${number1}`;
    } else if (haveNumber1) {
        number2 += value;
        display.innerText = `${number1} ${operator} ${number2}`;
    }           
}

function clearOperatorHighlight() {
        operatorButtons.forEach(button => {
            button.classList.remove("highlight")
        })
};

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", handleOperatorButtonClick)
})

function handleOperatorButtonClick(e)  {
    if (!haveNumber1) { 
        if (number1 === "") return; 
        if (e.target.value === "=") return;
        operator = e.target.value;
        display.innerText = `${number1} ${operator}`;
        haveNumber1 = true;
        const button = e.target
        button.classList.add("highlight")   
    } else if (haveNumber1) {
        if (number2 === "") return;
        const number3 = operate(Number(number1), operator, Number(number2))
        result = formatResultForDisplay(number3)
        const button = e.target
        button.classList.add("highlight")
        if (e.target.value === "=") {
            number1 = "";
            operator = "";
            number2 = "";
            haveNumber1 = false;
            display.innerText = `${result}`;
        } else {
            number1 = result;
            operator = e.target.value;
            number2 = "";
            haveNumber1 = true;
            display.innerText = `${result} ${operator}`;
        }
    }
}

function formatResultForDisplay(num, maxLength = 15) {
    let str = parseFloat(num.toPrecision(10)).toString(); 
    if (str.length <= maxLength) return str;
}

function operate(number1, operator, number2) {
    if (operator === "+") {
        return addition(number1, number2);
    } else if (operator === "-") {
        return subtraction(number1, number2);
    } else if (operator === "*") {
        return multiplication(number1, number2);
    } else if (operator === "/") {
        return division(number1, number2);
    }
}

function addition (number1, number2) {
    return number1 + number2;
}
function subtraction (number1, number2) {
    return number1 - number2;
}
function multiplication (number1, number2) {
    return number1 * number2;
}
function division (number1, number2) {
    if (number2 === 0) {
        return "ERROR";
    } else {
        return number1 / number2;
    }
}