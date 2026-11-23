const display = document.getElementById("display");
// Display button values
function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += value;
}
// Clear display
function clearDisplay() {
    display.value = "";
}
// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}
// Calculate result
function calculate() {
    try {
        const expression = display.value;
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            throw new Error("Invalid input");
        }
        if (!expression.trim()) return;
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Math error");
        }
        display.value = Number(
            result.toFixed(10)
        ).toString();

    } catch (error) {
        display.value = "Error";
    }
}
// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/^[0-9.+\-*/%()]$/.test(key)) {
        appendValue(key);
    }
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        deleteLast();
    }
    else if (key === "Escape") {
        clearDisplay();
    }
});