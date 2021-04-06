const resetBtn = document.querySelector("a[class='btn__reset']"); //For "Start" button
const exitBtn = document.querySelector("a[class='btn__exit']"); //For "Exit" button
const overlay = document.getElementById('overlay');  //For game overlay
const ul = document.querySelector('ul'); //For unordered list for phrase to guess
const qwerty = document.getElementById('qwerty');  // For onscreen keyboard
const tries = document.getElementsByTagName('img'); // For list items of tries
const overlayTitle = document.querySelector('.title');      //For overlay h2 title element
const buttons = document.getElementsByTagName("button");    //For accessing button elements of keyboard
let phraseChosen = "";

let missed = 0;  // Missed guesses counter
const hearts = 5;  // Number of tries at start of game


/******** Array of phrases to be selected from ********/
let phraseArray = [
    'the unexamined life is not worth living',
    'the only thing we have to fear is fear itself',
    'where there is love there is life',
    'cry havoc and let slip the dogs of war',
    'there is a sucker born every minute',
    'the truth is more important than the facts',
    'one if by land two if by sea'
];


/****** Listens for the start game button to be pressed ******/
resetBtn.addEventListener('click', () =>{
    overlay.style.visibility = 'hidden';
    phraseChosen= getRandomPhraseAsArray(phraseArray);
    addPhraseToDisplay(phraseChosen);
});

/****** Listens for the start game button to be pressed ******/
exitBtn.addEventListener('click', () =>{
    window.close();
});


/****** Returns a random phrase from the phraseArray ******/
const getRandomPhraseAsArray = array => {
    let num = Math.floor(Math.random() * array.length);
    let sentSelected = array[num];

    return sentSelected;    
};


/****** Adds letter from a sentence to the screen ******/
const addPhraseToDisplay = sentence => {  
    for (let i = 0; i < sentence.length; i++){ 
        const li = document.createElement('li');
        li.textContent = sentence[i];

        if (sentence[i] === " ") {
            li.classList.add("space"); 
        } else {
            li.classList.add("letter");
        }
        ul.appendChild(li);
    }
};


/****** Checks if a letter is in the phrase ******/

const checkLetter = button => {
    const list = document. getElementsByClassName('letter');
    let match = "";
    
    for (let i = 0; i < list.length; i++) {
        if (button === list[i].textContent) {
            list[i].classList.add("show");
            match = button;
        } 
    } 
    return match;
};


/******* Resets game to previous start conditions *******/
const resetGame = () => {
    
    //Resets onscreen keyboard
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = "";
        buttons[i].disabled = false;
    }

    //Erases list elements prom previous phrase
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    //Restores hearts
    for(let i = 0; i < hearts; i++) {
        tries[i].src = "images/liveHeart.png";
    }
    missed = 0;
};

const totalLetters = document.getElementsByClassName('letter');  // For total number of letters in the phrase
const showLetters = document.getElementsByClassName('show');     // Running total of letters shown

/****** Checks if the game was won or lost  ******/
const checkWin = () => {
    
    //Check for winning condition
    if (totalLetters.length === showLetters.length) {
        overlayTitle.textContent = "WoW!!! You won!!!";
        overlay.className = "win";
        //resetBtn.className = "win";
        overlay.style.visibility = 'visible';
        resetGame();
        
    } 
    //Check for losing condition
    if (missed === hearts) {
        overlayTitle.textContent = "Sorry, you are out of guesses!!! You lose!!!";
        overlay.className = "lose";
        //resetBtn.className = "lose";
        overlay.style.visibility = 'visible';
        resetGame();
    }
};


/****** Listens for onscreen keyboard to be clicked ******/
qwerty.addEventListener('click', e => {
    let keyPressed = e.target;

    if(e.target.tagName === 'BUTTON' && e.target.className !== ('chosen')) {
        e.target.classList.add("chosen");
        keyPressed.setAttribute("disabled", true);
        let button = e.target.textContent;

        let letterFound = checkLetter(button);

        //Remove heart if needed and increments "missed" variable
        if (letterFound === "") {
            missed++;
            tries[hearts - missed].src = "images/lostHeart.png";
        }
        checkWin();
    }   
});


