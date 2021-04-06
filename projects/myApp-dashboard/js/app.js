const alertBanner = document.getElementById("alert");             //Access alert banner

let emailSetting = document.getElementById('emailNotifications'); //Access email settings
let profileSetting = document.getElementById('profileSetting');   //Access profile settings
let timeZone = document.querySelector('#timezone');               //Access timezone settings
let saveButton = document.getElementById('save');                 //Access settings save button
let cancelButton = document.getElementById('cancel');             //Access settings cancel button

let searchBar = document.getElementById("user-field");            //Access search field

let counter = 0;                                                  //Counter for alerts 
const bellIcon = document.querySelector('.bell-icon');  //Access bell icon
const bellNotification = document.getElementById('notifications'); //Access bell notifications dot
const bellDiv = document.getElementById('bell-alert'); //Access div alerts are in

const sendButton = document.getElementById('send');    //Access send button

/*****************************/
/******* App User List *******/
/*****************************/

const userList = [
    'Victoria Chambers',
    'Mike Meyers',
    'Reina Fujikawa',
    'Enrique Balcazar',
    'Pablo Picasso',
    'Louis Pasteur',
    'John Keynes',
    'Srinivasa Ramanujan',
    'Alan Turing',
    'Carl Sagan',
    'Neil deGrasse Tyson',
    'Mark Twain',
    'Ansel Adams',
    'Nikola Tesla',
    'Albert Einstein',
    'Bill Gates',
    'Charles Darwin',
    'Rosa Parks',
    'James Earl Jones',
    'Joe Montana'
];

/************************************/
/******* Modal for Alert Icon *******/
/************************************/

bellDiv.innerHTML = 
    `
    <div class="bell-alert-modal">
        <div class="bell-alert-content">
            <span class="bell-alert-close">&times;</span>
            <p>Four new members are using MyApp.</p>
        </div>
    
        <div class="bell-alert-content">
            <span class="bell-alert-close">&times;</span>
            <p>You have 6 new email messages.</p>
        </div>
    </div>
    `;

const bellAlert = document.querySelector(".bell-alert-modal"); //Access modal 
const bellContent = document.getElementsByClassName("bell-alert-content"); //Access modal content divs
const bellClose = document.getElementsByClassName("bell-alert-close");  //Access close span



/***** Bell icon event listener *****/
bellIcon.addEventListener('click', e => {
    bellAlert.style.display = "block";  
    bellNotification.style.display = "none"; 
});

bellAlert.addEventListener('click', e => {
    if (e.target == bellClose[0]){
        bellContent[0].style.display = "none";
        counter++;
    }
    if (e.target == bellClose[1]){
        bellContent[1].style.display = "none";
        counter++;
    }
    if (counter == 2) {
        bellAlert.style.display = "none";
    }
});


/******* Click outside of modal to close *******/
window.onclick = function(event) {
    if (event.target == bellAlert) {
        bellAlert.style.display = "none";
    }
};


/*****************************/
/************Alerts***********/
/*****************************/

alertBanner.innerHTML = 
    `
    <div class="alert-banner">
            <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
            <p class="alert-banner-close">x<p/>
    </div>   
    `;

    alertBanner.addEventListener('click', e => {
        const element = e.target;
        if (element.classList.contains("alert-banner-close")) {
            document.getElementById("alert").style.display="none";
        }
    });

/*****************************/
/***** User Autocomplete *****/
/***** W3 Site Consulted *****/
/*****************************/

function autoComplete (input, array) {

    let currentFocus;

    input.addEventListener ("input", function(e) {

        let containDiv;
        let matchDiv;
        let i;
        let val = this.value; 
        closeAllLists();
        if(!val) { return false;}
        currentFocus = -1;

        containDiv = document.createElement("DIV");
        containDiv.setAttribute("id", this.id + "autocomplete-list");
        containDiv.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(containDiv);

        for (i = 0; i < array.length; i++) {
            if(array[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                matchDiv = document.createElement("DIV");
                matchDiv.innerHTML = array[i].substr(0, val.length);
                matchDiv.innerHTML += array[i].substr(val.length);
                matchDiv.innerHTML += "<input type='hidden' value='" + array[i] + "'>";

                    matchDiv.addEventListener("click", function(e) {
                        input.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();        
                    });
                    containDiv.appendChild(matchDiv);
            }
        }
    });

    input.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) {
            x = x.getElementsByTagName("div");
        } 
        if (e.keyCode == 40) {
            currentFocus++;
            addPossible(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addPossible(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) {
                    x[currentFocus].click();
                }
            }
        }
    });

    /***** Adds active class to possible matches *****/
    function addPossible(x) {
        if (!x) {
            return false;
        }
        removePossible(x);
        if (currentFocus >= x.length) {
            currentFocus = 0;
        }
        if (currentFocus < 0) {
            currentFocus = (x.length - 1);
        }
        x[currentFocus].classList.add("autocomplete-active");
    }

    /***** Removes non-matches and active clqass*****/
    function removePossible(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    /***** Close autocomplete list except one passed as argument *****/
    function closeAllLists(element) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if(element != x[i] && element != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /***** Close any open list when anywhere except field is clicked *****/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });

}

autoComplete(searchBar, userList);

/*****************************/
/** Messaging Error Message **/
/*****************************/

function checkFields() {
    let userField = document.forms.message.user.value;
    let messageField = document.forms.message.messageField.value;

    if (userField == "" || userField == null) {
        alert("Please enter a user's name.");
    }
    if (messageField == "" || messageField == null) {
        alert("Please enter a message to the user.");
    }
}

sendButton.addEventListener('click', e =>{
    checkFields();
});


/*****************************/
/******* Save Settings *******/
/*****************************/

/*********** Save settings to local storage ***********/
saveButton.addEventListener('click', e => { 
    localStorage.setItem('emailNotifications', emailSetting.checked);
    localStorage.setItem('profileSetting', profileSetting.checked);
    localStorage.setItem('timeZone', timeZone.value);
});

/*********** On page load, retrieve settings from local storage ***********/
window.addEventListener('load', e => {
    emailSetting.checked = JSON.parse(localStorage.getItem('emailNotifications'));
    profileSetting.checked = JSON.parse(localStorage.getItem('profileSetting'));
    timeZone.value = localStorage.timeZone;
}); 

/*********** Resets all settings / On page load, all will be reset ***********/
cancelButton.addEventListener('click', e => {
    localStorage.setItem('emailNotifications', false);
    localStorage.setItem('profileSetting', false);
    localStorage.setItem('timeZone', "0");
});

