let num1 = 0;   //Randomly generated number
let num2 = 0;   //Randomly generated number
let numberCorrect = 0;  //Counter for number correct
let problemsDone = 0;   //Counter for total problems done
const nextButton = document.getElementById('nextButton'); //next button
const checkButton = document.getElementById('checkButton'); //check button
const resetButton = document.getElementById('resetButton'); //reset button
const feedback =  document.getElementById('feedback'); //feedback
const problemBox = document.getElementById('problemBox'); //problembox
const answer = document.getElementById('answer'); //answer
let largeNum = localStorage.getItem("largeNumLimit"); //Stores user input for large number
let smallNum= localStorage.getItem("smallNumLimit");  //Stores user input for small number
let pageToOpen= localStorage.getItem("pageToOpen");   //Stores user input for drill type


/******************************************************/
/***************   Problem Generator ******************/
/* Generates problems and displays them on the screen */
/******************************************************/


function generateProblem () {
    nextButton.disabled = true;
    checkButton.disabled = false;
    resetButton.disabled = true;

    if ((pageToOpen === "multiplication" || pageToOpen === "division") && smallNum >= 20){
        num1 = Math.floor(Math.random() * (smallNum - 2 + 1) +2);
        num2 = Math.floor(Math.random() * (largeNum - 2 + 1) +2);
    } else {
        num1 = Math.floor(Math.random() * smallNum +1);
        num2 = Math.floor(Math.random() * largeNum +1);
    } 


    if (pageToOpen === "addition") {
        problemBox.innerHTML = `<p>${num1} + ${num2} =  ?</p>`;
        answer.value = "";
        feedback.innerHTML = `<p></p>`;
    } else if (pageToOpen === "multiplication") {
        problemBox.innerHTML = `<p>${num1} x ${num2} =  ?</p>`;
        answer.value = "";
        feedback.innerHTML = `<p></p>`; 
    } else if (pageToOpen === "subtraction"){

        if (num1 < num2) {
            let tempNum1 = num1;
            num1 = num2;
            num2 = tempNum1;
        }
        problemBox.innerHTML = `<p>${num1} - ${num2} =  ?</p>`;
        answer.value = "";
        feedback.innerHTML = `<p></p>`;  
    }  else if (pageToOpen === "division"){
        
        if (num1 < num2) {
            let tempNum1 = num1;
            num1 = num2;
            num2 = tempNum1;
        }
        if (num1%num2 === 0) {
            problemBox.innerHTML = `<p>${num1} &#247 ${num2} =  ?</p>`;
            answer.value = "";
            feedback.innerHTML = `<p></p>`;
        } else {
            generateProblem();
        }
    }
    
    SetFocus();    
    
}


/**********************************************************************/
/*** Gets answer from user after button click and calls checkAnswer ***/
/**********************************************************************/

function getInputValue(){
    // Selecting the input element and get its value 
    var inputVal = answer.value;
    inputVal = +inputVal;
    checkAnswer(num1, num2, inputVal);
}

/**********************************************************************/
/*************** Checks answer and displays feedback ******************/
/**********************************************************************/

function checkAnswer  (num1, num2, inputVal) {
    let total;

    if (pageToOpen === "addition"){
        total = num1 + num2;
    } else if (pageToOpen === "subtraction") {
        total = num1 - num2;
    } else if (pageToOpen === "multiplication") {
        total = num1 * num2;
    } else if (pageToOpen === "division") {
        total = num1/num2;
    } 

    if (total == inputVal) {
        numberCorrect += 1;
        feedback.innerHTML = `<p>CORRECT!</p>`; 
    } else {
        feedback.innerHTML = `<p>Oops!  The answer is ${total}.</p>`; 
    }
    
    nextButton.disabled = false;
    checkButton.disabled = true;
    problemsDone++;

    if (problemsDone === 10) {
        feedback.innerHTML = `<p>You got ${numberCorrect} out of 10.  Click EXIT to quit or RESET to play again.</p>`;
        nextButton.disabled = true;
        resetButton.disabled = false;
    }
} 

/**** Keeps cursor active in the input field ****/

function SetFocus () {
    let input = answer;
    input.focus ();
}

/*********** Function to Reset Drill ************/ 

function resetProgram () {
    numberCorrect = 0;
    problemsDone = 0;
    generateProblem();
}

/********* Function to Exit Drill Page **********/ 

function exitProgram () {
    window.close();
}

generateProblem ();







        
