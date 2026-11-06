
const display = document.getElementById("display");

let current = "0";
let previous = null;
let operator = null;
let resetScreen = false;

function updateDisplay() {
    display.value = current;
}

function inputNumber(number) {
    if (resetScreen) {
        current = number;
        resetScreen = false;
    } else {
        current = current === "0"
            ? number
            : current + number;
    }

    updateDisplay();
}

function inputDecimal() {
    if (resetScreen) {
        current = "0.";
        resetScreen = false;
    } else if (!current.includes(".")) {
        current += ".";
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (operator !== null && !resetScreen) {
        calculate();
    }

    previous = Number(current);
    operator = op;
    resetScreen = true;
}

function calculate() {
    if (operator === null || previous === null) return;

    const a = previous;
    const b = Number(current);
    let result;

    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0) {
                current = "Tidak bisa dibagi 0";
                previous = null;
                operator = null;
                resetScreen = true;
                updateDisplay();
                return;
            }
            result = a / b;
            break;
    }

    current = String(Number(result.toPrecision(12)));
    previous = null;
    operator = null;
    resetScreen = true;

    updateDisplay();
}

function clearAll() {
    current = "0";
    previous = null;
    operator = null;
    resetScreen = false;
    updateDisplay();
}

function deleteNumber() {
    if (resetScreen) {
        current = "0";
        resetScreen = false;
    } else {
        current = current.length > 1
            ? current.slice(0, -1)
            : "0";
    }

    updateDisplay();
}

function percent() {
    current = String(Number(current) / 100);
    updateDisplay();
}

function changeSign() {
    current = String(Number(current) * -1);
    updateDisplay();
}

// Mengaktifkan semua tombol
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {

        if (button.dataset.number !== undefined) {
            inputNumber(button.dataset.number);
        }

        if (button.dataset.operator) {
            chooseOperator(button.dataset.operator);
        }

        switch (button.dataset.action) {
            case "clear":
                clearAll();
                break;
            case "delete":
                deleteNumber();
                break;
            case "decimal":
                inputDecimal();
                break;
            case "calculate":
                calculate();
                break;
            case "percent":
                percent();
                break;
            case "sign":
                changeSign();
                break;
        }
    });
});

// Mendukung keyboard
document.addEventListener("keydown", event => {
    if (/^[0-9]$/.test(event.key)) {
        inputNumber(event.key);
    } else if (event.key === ".") {
        inputDecimal();
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperator(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        calculate();
    } else if (event.key === "Backspace") {
        deleteNumber();
    } else if (event.key === "Escape") {
        clearAll();
    }
});
