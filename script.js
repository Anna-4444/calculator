const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");

const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");
const equal = document.querySelector("#equal");

const clear = document.querySelector(".clear");
const posNeg = document.querySelector(".positive-negative");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");
const bkspc = document.querySelector(".backspace");

const display = document.querySelector(".display")

let number1 = '';
let operator = '';
let number2 = '';
let expressionArray = [];
let result = '';

zero.addEventListener("click", function(){
    //if zero is first number, dont need
    if (display.innerText.length < 12) {
    display.innerText += 0;
    clearHighlight();
    }
});

one.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 1;
    clearHighlight();
    }
});

two.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 2;
    clearHighlight();
    }
});

three.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 3;
    clearHighlight();
    } 
});

four.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 4;
    clearHighlight();
    }
});

five.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 5;
    clearHighlight();
    }
});

six.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 6;
    clearHighlight();
    }
});

seven.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 7;
    clearHighlight();
    }
});

eight.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 8;
    clearHighlight();
    }
});

nine.addEventListener("click", function(){
    if (display.innerText.length < 12) {
    display.innerText += 9;
    clearHighlight();
    }
});

decimal.addEventListener("click", function() {
    let numb = display.innerText;
    if (!numb.includes(".")){
        display.innerText += ".";
        clearHighlight();
        decimal.disabled = true;
    }    
});

posNeg.addEventListener("click", function() {
    let numb = display.innerText;
    let symb = "-";
    if (numb.charAt(0) === symb) {
        let posNumb = numb.slice(1);
        display.innerText = posNumb;
    } else {
        let negNumb = symb.concat(numb);
        display.innerText = negNumb;
    }
});

percent.addEventListener("click", function(){
    let numb = display.innerText;
    let percentage = numb / 100;
    display.innerText = percentage;
});

bkspc.addEventListener("click", function(){
    let numb = display.innerText;
    let bkspcNumb = numb.slice(0, numb.length - 1)
    display.innerText = bkspcNumb;
})

function clearHighlight() {
    if (add.classList.contains("highlight")) {
        add.classList.remove("highlight")
    } else if (divide.classList.contains("highlight")) {
        divide.classList.remove("highlight")
    } else if (multiply.classList.contains("highlight")) {
        multiply.classList.remove("highlight")
    } else if (subtract.classList.contains("highlight")) {
        subtract.classList.remove("highlight")
    } else if (equal.classList.contains("highlight")) {
        equal.classList.remove("highlight")
    }
};

add.addEventListener("click", function(){
    add.classList.add('highlight');
    const value = display.innerText;
    const sign = "+";
    display.innerText = '';
    decimal.disabled = false;
    createExpressionArray(value, sign);
});

subtract.addEventListener("click", function(){
    subtract.classList.add('highlight');
    const value = display.innerText;
    const sign = "-";
    display.innerText = '';
    decimal.disabled = false;
    createExpressionArray(value, sign);
});

divide.addEventListener("click", function(){
    divide.classList.add('highlight');
    const value = display.innerText;
    const sign = "/";
    display.innerText = '';
    decimal.disabled = false;
    createExpressionArray(value, sign);
});

multiply.addEventListener("click", function(){
    multiply.classList.add('highlight');
    const value = display.innerText;
    const sign = "*";
    display.innerText = '';
    decimal.disabled = false;
    createExpressionArray(value, sign);
});

equal.addEventListener("click", function() {
    if (expressionArray.length === 2) {
        equal.classList.add('highlight');
        const value = display.innerText;
        const sign = "=";
        display.innerText = '';
        decimal.disabled = false;
        createExpressionArray(value, sign);
    };
});

clear.addEventListener("click", function() {
    display.innerText = '';
    decimal.disabled = false;
    reset();
    clearHighlight();
});

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

