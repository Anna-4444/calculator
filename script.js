const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const equal = document.querySelector("#equal");
const display = document.querySelector(".display");
const decimal = document.querySelector(".decimal");

let number1 = '';
let operator = '';
let number2 = '';
let expressionArray = [];
let result = '';

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (display.innerText.length < 12) {
            display.innerText += e.target.value;
        }
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", ((e) => {
        button.classList.add("highlight");
        decimal.disabled = false;
        createExpressionArray(display.innerText, e.target.value);
        display.innerText = "";
        equal.classList.remove("highlight");
    }))
})

equal.addEventListener("click", function() {
    if (expressionArray.length === 2) {
        equal.classList.add('highlight');
        decimal.disabled = false;
        value = display.innerText;
        display.innerText = '';
        createExpressionArray(value, "=");
        clearOperatorHighlight();
    };
});

// decimal button
decimal.addEventListener("click", function() {
    if (!display.innerText.includes(".")){
        display.innerText += ".";
        decimal.disabled = true;
        equal.classList.remove("highlight");
    }    
});

// positive-negative button
document.querySelector(".pos-neg").addEventListener("click", function() {
    if (display.innerText.charAt(0) === "-") {
        display.innerText = display.innerText.slice(1);
    } else {
        display.innerText = "-" + display.innerText;
    }
    equal.classList.remove("highlight");
});

// percent button
document.querySelector(".percent").addEventListener("click", function(){
    display.innerText = display.innerText / 100;
    equal.classList.remove("highlight");
});

// backspace button
document.querySelector(".backspace").addEventListener("click", function(){
    display.innerText = display.innerText.slice(0, display.innerText.length - 1);
    equal.classList.remove("highlight");
})

// clear button
document.querySelector(".clear").addEventListener("click", function() {
    display.innerText = '';
    decimal.disabled = false;
    clearOperatorHighlight();
    equal.classList.remove("highlight")
    reset();
});

function clearOperatorHighlight() {
        operatorButtons.forEach(button => {
            button.classList.remove("highlight")
        })
};

function createExpressionArray(value, sign){
    if (number1 === '') {
        number1 = value;
        expressionArray.push(number1);
    } else {
        number2 = value;
        expressionArray.push(number2)
        console.log(expressionArray);
    };
    if (operator === '' && sign === "+" || sign === "-" || sign === "*" || sign === "/") {
        operator = sign;
        expressionArray.push(operator);
        console.log(expressionArray);
    } else {
        getExpression(expressionArray);
    };
};

function getExpression(array){
    number1 = parseFloat(array[0]);
    operator = array[1];
    number2 = parseFloat(array[2]);
    console.log(number1, operator, number2);
    operate(number1, operator, number2);
};

function operate(num1, op, num2) {
    if (op === "+") {
        addition(num1, num2)
        reset()
    } else if (op === "-") {
        subtraction(num1, num2)
        reset()
    } else if (op === "*") {
        multiplication(num1, num2)
        reset()
    } else if (op === "/") {
        division(num1, num2)
        reset()
    }
};
 
function reset () {
    number1 = '';
    operator = '';
    number2 = '';
    expressionArray = [];
};

function addition(number1, number2) {
    result = number1 + number2;
    display.innerText = result;
};

function subtraction(number1, number2) {
    result = number1- number2;
    display.innerText = result;
};

function multiplication(number1, number2) {
    result = number1 * number2;
    display.innerText = result;
};

function division(number1, number2) {
    if (number2 === 0) {
        display.innerText = "Do you want to have an existential crisis?";
    } else {
        result = number1 / number2;
        display.innerText = result;
    };
};

