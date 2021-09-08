/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {

    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
    createPhrases(){
        let phraseObjectArray = [];
        
        const phraseList = [
            'A chain is only as strong as its weakest link',
            'Necessity is the mother of invention',
            'Batten down the hatches',
            'Wear your heart on your sleeve',
            'Failing to plan is planning to fail',
            'Old soldiers never die they simply fade away',
            'I have nothing to declare but my genius',
            'Early bird catches the worm',
            'Using a sledgehammer to crack a nut',
            'For every thing there is a season'];

        phraseList.forEach(phrase => {
            phraseObjectArray.push(new Phrase(phrase));
        });

        return phraseObjectArray
    };
    
    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];        
    };

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        // Remove overlay start screen
        document.getElementById('overlay').style.display = 'none';

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const totalLetters = document.getElementsByClassName('letter');  // For total number of letters in the phrase
        const showLetters = document.getElementsByClassName('show');     // Running total of letters shown

        // Checks to see if all letters have been shown
        if (totalLetters.length === showLetters.length) {
            return true;        
        } else {
            return false;
        }
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const lifeHearts = document.getElementsByTagName('img');  // Get heart images
        lifeHearts[this.missed].src = "images/lostHeart.png";
        this.missed += 1;

        if (this.missed >= 5) {
            this.gameOver();
        }
    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlayTitle = document.getElementById('game-over-message');   // Get message h1
        const screenOverlay = document.getElementById('overlay');            // Get Screen overlay
        screenOverlay.style.display = 'inherit';

        // If win
        if(gameWon){
            overlayTitle.textContent = "Great job!!! You won!!!";
            screenOverlay.className = 'win';
        } //If lose 
        else  {
            overlayTitle.textContent = "Sorry, you are out of guesses!!! You lose!!!";
            screenOverlay.className = 'lose';
        }
        this.resetGame();
    };

    /**
    * Resets the game after a win or loss 
    */
    resetGame(){
        const buttons = document.getElementsByTagName("button");    //For accessing button elements of keyboard
        const lifeHearts = document.getElementsByTagName('img');    // Get heart images
        const ul = document.querySelector('ul');                    // Get unordered list

        //Resets onscreen keyboard
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = 'key';
            buttons[i].disabled = false;
        }
        //Restores hearts
        for(let i = 0; i < lifeHearts.length; i++) {
            lifeHearts[i].src = "images/liveHeart.png";
        }
        //Erases list elements from previous phrase
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        document.removeEventListener('keydown', keyBoardListener);
        this.missed = 0;
    };

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button) {
        button.setAttribute("disabled", true);    // Disable button on screen
        const correctLetter = this.activePhrase.checkLetter(button.textContent); // Check guess for correctness

        // Correct letter guessed
        if(correctLetter && button.className !== ('chosen')){
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(button.textContent);
                // Check for win
                let won = this.checkForWin()
                if(won){
                    this.gameOver(won);
                }
        // Incorrect letter guessed   
        } else if (!correctLetter){
            button.classList.add('wrong');
            this.removeLife();
        };
    };
}