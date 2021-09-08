/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {

    constructor (phrase) {
        this.phrase = phrase.toLowerCase();
    };

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay(){
        const ul = document.querySelector('ul');  // Get unordered list

        //  Add class attribute to each letter or space
        for (let i = 0; i < this.phrase.length; i++){ 
            const li = document.createElement('li');
            li.textContent = this.phrase[i];
    
            if (this.phrase[i] === " ") {
                li.classList.add('hide','space', );
            } else {
                li.classList.add('hide', 'letter', this.phrase[i]);
            }
            ul.appendChild(li);
        }
    };

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        const phraseLetters = document. getElementsByClassName('letter');  // Gets letters

        for (let i = 0; i < phraseLetters.length; i++) {
            if (letter === phraseLetters[i].textContent) {
                phraseLetters[i].classList.add("show");
            } 
        } 
    };  
}