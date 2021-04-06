const operation = document.getElementById('operation');
const largeNumber = document.getElementById('largest-num');
const smallNumber = document.getElementById('smallest-num');
const startButton = document.getElementById('start-button');
let pageToOpen;

startButton.addEventListener('click', (e) => {
    if (largeNumber.value === "" || smallNumber.value === "") {
        alert("Please choose your number limits.")
        startButton.disabled = true;
    } else {
        startButton.disabled = false;
        localStorage.setItem("largeNumLimit", largeNumber.value);
        localStorage.setItem("smallNumLimit", smallNumber.value);
        pageToOpen = operation.value;
        localStorage.setItem("pageToOpen", operation.value);

        if (pageToOpen === "addition") {
            window.open("html/addition.html");
        } else if (pageToOpen === "subtraction") {
            window.open("html/subtraction.html");
        } else if (pageToOpen === "multiplication") {
            window.open("html/multiplication.html");
        } else if (pageToOpen === "division") {
            window.open("html/division.html");
        } else {
            window.open("html/index.html");
        }
    }

    largeNumber.value = "";
    smallNumber.value = "";
    startButton.disabled = false;
    
});
