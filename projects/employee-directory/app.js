/************ Global Variables  **************/
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const empSearch = document.getElementById("search");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalArrows = document.getElementById('modal-buttons');
const nextEmployee = document.getElementById('forward');
const prevEmployee = document.getElementById('backward');
let currentModalIndex;

/****************************************************/
/*************** Fetch Employee Data ****************/
/****************************************************/

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


/****************************************************/
/*************** Display Employee Data **************/
/****************************************************/

function displayEmployees(employeeData) {
    employees = employeeData;

    //Store employee as it is created
    let employeeHTML = '';

    //Loop through each employee to create HTML
    employeeData.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}"/>
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}


/****************************************************/
/****************** Display Modal *******************/
/****************************************************/

function displayModal(index) {

    let {name, dob, phone, email, location :{city, street, state, postcode}, picture} = employees[index];
    
    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

/****************************************************/
/********* Event Listener to Display Modal **********/
/****************************************************/

gridContainer.addEventListener('click', event => {
    if(event.target !==gridContainer) {
        
        const card = event.target.closest(".card");
        const index = card.getAttribute('data-index');
        currentModalIndex = index;
        displayModal(index);
    }
});


/****************************************************/
/****** Ev-Lis to Select Next Employee in Modal *****/
/****************************************************/

modalArrows.addEventListener('click', e => {
    if(e.target === nextEmployee && currentModalIndex < employees.length){
        currentModalIndex++; 
    } else if(e.target === nextEmployee && currentModalIndex === employees.length){
        currentModalIndex = 0;
    } else if(e.target === prevEmployee && currentModalIndex > 0) {
        currentModalIndex--;
    } else if(e.target === prevEmployee && currentModalIndex == 0) {
        currentModalIndex = employees.length - 1;
    }
    displayModal(currentModalIndex);
});


/****************************************************/
/******************* Close Modal ********************/
/****************************************************/

modalClose.addEventListener('click', e => {
    overlay.classList.add("hidden");
});


/****************************************************/
/***************** Employee Search ******************/
/****************************************************/

empSearch.addEventListener("keyup", employeeSearch);

function employeeSearch() {
    //Gets input and continuously saves to "input"
    let input = document.getElementById("search").value.toLowerCase();
    
    //Gets employee cards and employee names
    const empCards = document.getElementsByClassName('card');
    const empNames = document.getElementsByClassName('name');

    for (let i= 0; i < employees.length; i++) {
        if (empNames[i].textContent.toLowerCase().includes(input)) {
            empCards[i].style.display = "";
        } else {
            empCards[i].style.display = "none";
        }    
    }
}

