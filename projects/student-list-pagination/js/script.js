/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

let pageItems = 9;
//Gets link-list
const linkList = document.querySelector("ul.link-list");
//Gets students names
const searchH2 = document.querySelector("h2");
//To get element with class of "student-list"
const studentList = document.querySelector("ul.student-list");
//For search bar
let searchBar = `<label for="search" class="student-search">
                  <span>Search by name</span>
                  <input id="search" placeholder="Search by name...">
                  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                 </label>
`;

//Stores search results in this array
let searchArray = [];

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   //index for first student on page
   let startIndex = (page * pageItems) - pageItems;
   //index for last student on page
   let endIndex = page * pageItems;
   //variable for HTML to be inserted
   let studentItem = ""; 
   //Clears studentListVariable
   studentList.innerHTML = "";
   
   //Loops through list to display each student
   for(let i=0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentItem = `
            <li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture"  />
                  <h3>${list[i].name.first} ${list[i].name.last}</h3> 
                  <span class="email">${list[i].email}</span>
               </div>   
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>
            `;
            //Inserts HTML into document
            studentList.insertAdjacentHTML("beforeend", studentItem);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   //Calculates the number of pages
   let numOfPages = Math.ceil(list.length/pageItems);
   //Clears buttons
   linkList.innerHTML = "";
   console.log(linkList);
   let button;

   //Add buttons to the bottom of page
   for(let i = 1; i <= numOfPages; i++) {
      button = `<li>
                  <button type="button">${i}</button>
               </li> 
      `;
      linkList.insertAdjacentHTML("beforeend", button);
   }
   document.querySelector(".link-list button").classList.add("active");

   //Event listener for pagination buttons
   linkList.addEventListener('click', (e) => {
      if(e.target.tagName === "BUTTON") {
         //Gets button with "active" class
         const activeBtn = document.querySelector(".active");
         if (activeBtn) {
            activeBtn.className = "";
         }
         e.target.classList.add("active");
         showPage(list, e.target.textContent);
      }
   });
}

// Call functions
//Inserts search bar
searchH2.insertAdjacentHTML("afterend", searchBar);
showPage(data, 1);
addPagination(data);


/*----------------------------------------------------
  Event listener for search box input and function call
------------------------------------------------------*/

document.getElementById("search").addEventListener("keyup", e => {
   //Gets input and continuously saves to "input"
    let input = document.getElementById("search").value;
    //Stores "input" in "searchItem" in all lowercase
    let searchItem = input.toLowerCase();
    searchArray = [];

   for(let i=0; i < data.length; i++) {
      
      let lastName = data[i].name.last.toLowerCase();
      let firstName = data[i].name.first.toLowerCase();
      //Concatenate first and last name
      let fullName = firstName + " " + lastName;
      
      if (fullName.includes(searchItem)) {
         searchArray.push(data[i]);
      } 
   }

   //Display results or no results message
   if (searchArray.length > 0) {
      showPage(searchArray, 1);
      addPagination(searchArray);
   } else {
      studentList.innerHTML = "<h1>Sorry, no students found</h1>";
      linkList.innerHTML = "";
   }
});





