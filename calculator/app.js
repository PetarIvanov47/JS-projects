const display = document.getElementById('display');

function appendDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}


function calculate() {
    try {
        // Dont use eval in production...
        display.value = eval(display.value);

    } catch (error) {
        display.value = 'Error';

        setTimeout(() => {
            display.value = "";
        } ,2000)
    }

}