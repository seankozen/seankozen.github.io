/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array 
***/
const quotes = [

  {
    quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    source: "Albert Einstein",
    citation: "Ego, Hunger, and Aggression: a Revision of Freud’s Theory and Method",
    year: "1945",
    tags: "science"
  },

  {
    quote: "Falsity in intellectual action is intellectual immorality.",
    source: "Thomas Chrowder Chamberlin",
    citation: "University of Michigan Annual Commencement",
    year: "1888",
    tags: "science"
  },

  {
    quote: "A man who dares to waste one hour of time has not discovered the value of life.",
    source: "Charles Darwin"
  },

  {
    quote: "The good thing about science is that it's true whether or not you believe in it.",
    source: "Neil deGrasse Tyson",
    citation: "The Colbert Report",
    tags: "science"
  },

  {
    quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    source: "Marie Curie"
  },

  {
    quote: "Be yourself; everyone else is already taken.",
    source: "Oscar Wilde",
    tags: "inspirational"
  },

  {
    quote: "A room without books is like a body without a soul.",
    source: "Marcus Tullius Cicero"
  },

  {
    quote: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    source: "Bernard M. Baruch"
  },

  {
    quote: "Be the change that you wish to see in the world.",
    source: "Mahatma Gandhi"
  },

  {
    quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    source: "Maya Angelou"
  },

];


/***
 * `getRandomQuote` function
***/
function getRandomQuote (array) {
  let randomIndex = Math.floor(Math.random() * quotes.length);    //create random index
  let randomQuote = array[randomIndex];                //Get random quote object from quote array
  return randomQuote;
  
}

/***
 * `change_bg_color` function
***/

function change_bg_color() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  let bg_Color = "rgb(" + r + "," + g + "," +  b +")";
  document.body.style.backgroundColor = bg_Color;

}


/***
 * `printQuote` function
***/

function printQuote(){
  //Generate random quote
  const randomQuote = getRandomQuote(quotes);                         

  //Create HTML to print quote on screen
  let quoteText = '<p class="quote">' + randomQuote.quote + '</p> \
                   <p class="source">' + randomQuote.source;

  //Check for citation property
  if (randomQuote.citation) {
    quoteText += '<span class="citation">' + randomQuote.citation +'</span>';
  }
  //Check for year property
  if (randomQuote.year) {
    quoteText += '<span class="year">' + randomQuote.year + '</span>';
  }
  //Check for tags property
  if(randomQuote.tags){
    quoteText += '<br><span class="tags">-' + randomQuote.tags + '-</span>';
  }

  quoteText += '<p/>';
  //Print quote to screen
  change_bg_color();
  document.getElementById('quote-box').innerHTML = quoteText;
}

/***
 * Background color change function
***/

setInterval(printQuote, 10000);


/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/



document.getElementById('load-quote').addEventListener("click", printQuote, false);