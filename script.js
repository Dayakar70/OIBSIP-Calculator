document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let shouldResetScreen = false;

    function resetDisplay() {
        display.innerText = '0';
        currentInput = '';
        previousInput = '';
        operator = '';
        shouldResetScreen = false;
    }

    function appendNumber(number) {
        if (display.innerText === '0' || shouldResetScreen) {
            display.innerText = number;
            shouldResetScreen = false;
        } else {
            display.innerText += number;
        }
        currentInput = display.innerText;
    }

    function chooseOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        shouldResetScreen = true;
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return;
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    resetDisplay();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        display.innerText = result;
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        shouldResetScreen = true;
    }

    function appendDot() {
        if (shouldResetScreen) resetDisplay();
        if (!currentInput.includes('.')) {
            currentInput += '.';
            display.innerText = currentInput;
        }
    }

    function handleClear() {
        resetDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const value = e.target.getAttribute('data-value');
            if (value >= '0' && value <= '9') {
                appendNumber(value);
            } else if (value === '.') {
                appendDot();
            } else if (['+', '-', '*', '/'].includes(value)) {
                chooseOperator(value);
            } else if (value === 'C') {
                handleClear();
            } else if (value === '=') {
                calculate();
            }
        });
    });
});

