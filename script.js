const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const equal = document.querySelector("#equal");
const display = document.querySelector(".display");

let number1 = "";
let operator = "";
let number2 = "";
let expressionArray = [];

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (display.innerText.length < 12) {
            display.innerText += e.target.value;
        }
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", ((e) => {
        if (display.innerText !== "") {
            button.classList.add("highlight");
            createExpressionArray(display.innerText, e.target.value);
            display.innerText = "";
            equal.classList.remove("highlight");
        }
    }))
})

equal.addEventListener("click", function() {
    if (expressionArray.length === 2) {
        equal.classList.add("highlight");
        value = display.innerText;
        display.innerText = "";
        createExpressionArray(value, "=");
        clearOperatorHighlight();
    };
});

// decimal button
document.querySelector(".decimal").addEventListener("click", function() {
    if (!display.innerText.includes(".")){
        display.innerText += ".";
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
    display.innerText = "";
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
    if (number1 === "") {
        number1 = value;
        expressionArray.push(number1);
    } else {
        number2 = value;
        expressionArray.push(number2)
    };
    if (operator === "" && sign === "+" || sign === "-" || sign === "*" || sign === "/") {
        operator = sign;
        expressionArray.push(operator);
    } else {
        calculate(expressionArray);
    };
};

function calculate(array) {
    if (array[1] === "+") {
        display.innerText = Number(array[0]) + Number(array[2]);
        reset()
    } else if (array[1] === "-") {
        display.innerText = Number(array[0]) - Number(array[2]);
        reset()
    } else if (array[1] === "*") {
        display.innerText = Number(array[0]) * Number(array[2]);
        reset()
    } else if (array[1] === "/") {
        if (Number(array[2]) === 0) {
            display.innerText = "Do you want to have an existential crisis?";
            reset()
        } else {
            display.innerText = Number(array[0]) / Number(array[2]);
            reset()
        }    
    }
}

function reset () {
    number1 = "";
    operator = "";
    number2 = "";
    expressionArray = [];
};