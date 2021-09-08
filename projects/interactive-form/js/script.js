/*********** Variables ***********/
const nameInput = document.getElementById('name');                 //  Get name input
const jobRole = document.getElementById('title');                  //  Get job role
const otherJobRole = document.getElementById('other-job-role');    //  Get other job role
const shirtDesign = document.getElementById('design');             //  Get shirt design
const shirtColor = document.getElementById('color');               //  Get shirt color
const regForActivities = document.getElementById('activities');    //  Get register for activities
const activitiesCost = document.getElementById('activities-cost'); //  Get activities cost
const activityCheckBoxes = document.querySelectorAll("input[type='checkbox']");  //Get activity boxes
const paymentSelect = document.getElementById('payment');          //  Get payment method
const creditCard = document.getElementById('credit-card');         //  Get credit card
const paypal = document.getElementById('paypal');                  //  Get paypal
const bitcoin = document.getElementById('bitcoin');                //  Get bitcoin 
const emailAddress = document.getElementById('email');             //  Get email address
const creditCardNum = document.getElementById('cc-num');           //  Get credit card number
const zipCode = document.getElementById('zip');                    //  Get zip code
const ccCvv = document.getElementById('cvv');                      //  Get credit card cvv
const regForm = document.querySelector('form');                    //  Get form element     

let totalCost = 0;                                                 //  Variable for total cost of activities
let validPayment;                                                  //  Variable for cc number authentication (boolean)

const nameCheck = /^[a-zA-Z]/;                                     //  Variable for regex for name validation
// Variable for regex for email validation
const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
const creditCardCheck = /^\d{13,16}?$/;                            //  Variable for regex for cc number validation
const cvvCheck = /^\d{3}?$/;                                       //  Variable for regex for cvv validation
const zipCheck = /^\d{5}?$/;                                       //  Variable for regex for zip code validation

/* Focus on name */
nameInput.focus();

/* Hide Other Job Role*/
otherJobRole.style.display = "none";

/* Disable shirt color field */
shirtColor.disabled = true;

//*************** Validation Function ***************//
function validateInput(inputData, validData) {
    
    // If input is not valid
    if(validData.test(inputData.value) === false) {
        inputData.parentNode.classList.remove("valid");
        inputData.parentNode.classList.add("not-valid");
        inputData.parentElement.lastElementChild.style.display = 'inline';
        return false;
    }  // If input is valid
    else {
        inputData.parentNode.classList.remove("not-valid");
        inputData.classList.remove("error-border");
        inputData.parentNode.classList.add("valid");
        inputData.parentElement.lastElementChild.style.display = 'none';
    }
}

//*** Registered for activities validation ***// 
function checkRegistration() {
    let validRegistration;

    // If not registered for any activities
    if(totalCost === 0) {
        regForActivities.classList.remove("valid");
        regForActivities.classList.add("not-valid");
        regForActivities.lastElementChild.style.display = 'inline';
        //alert("Must register for an activity!");
        validRegistration = false;
       
    } else { // If registered for activities
        regForActivities.classList.remove("not-valid");
        regForActivities.classList.remove("error-border");
        regForActivities.classList.add("valid");
        regForActivities.lastElementChild.style.display = 'none';
        validRegistration = true;   
    }
    return validRegistration;
}

//*** Credit card validation ***//
function creditCardValidation(){
    let validZip;
    let validCvv;
 
    // CCredit card validation
    if(paymentSelect.value === 'credit-card') {
        
        // Number validation
        if(creditCardNum.value.length == " ") {
            creditCardNum.parentNode.classList.remove("valid");
            creditCardNum.parentNode.classList.add("not-valid");
            creditCardNum.parentElement.lastElementChild.innerHTML = 'Credit card field must be filled it!';
            creditCardNum.parentElement.lastElementChild.style.display = "inline"; 
            validPayment = false;   
        } 
        //Zip code validation
        validZip = validateInput(zipCode, zipCheck); 
        
        // CVV validation
        validCvv = validateInput(ccCvv, cvvCheck); 

        if(validPayment === false || validZip === false || validCvv === false){
            return false;
        } 
    } else if (paymentSelect.value === 'bitcoin' || paymentSelect.value === 'paypal') {
        return true;
    }

    
}

//********* Job Role Event Listener *********//
jobRole.addEventListener('change', e => {

    // To display job role 'other' field
    if (e.target.value === 'other') {
        otherJobRole.style.display = "";
    } else {
        otherJobRole.style.display = "none";
    }
});

//*********  Shirt Style Event Listener *********//
shirtDesign.addEventListener('change', e => {
    let themeSelected;                          // Variable for theme selected
    let colorThemeOption = shirtColor.children; // Variable for color theme children
    
    //  Loop through colors to display or hide color options according to theme
    for(let i=0; i < shirtColor.length; i++) {
        let currentOption = colorThemeOption[i].getAttribute('data-theme');
        themeSelected = e.target.value;

        //  To display colors associated with selected theme
        if (currentOption === themeSelected) {
            colorThemeOption[i].hidden = false;
            colorThemeOption[i].setAttribute('selected', true);
        } else {
            //  To hide colors associated with unselected theme
            colorThemeOption[i].hidden = true;
            colorThemeOption[i].removeAttribute('selected');
        }
    }
    //  Display color options
    shirtColor.disabled = false;
});

//********* Event listener to calculate cost for activities *********//
regForActivities.addEventListener('change', e => {
    let dataCost =  e.target.getAttribute('data-cost');

    // Check for checked item
    if(e.target.checked === true){
        totalCost += +dataCost;
    }
    // Check for unchecked item
    if(e.target.checked === false){
        totalCost -= +dataCost;
    }
    //  Display total cost on page
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

paypal.hidden = true;
bitcoin.hidden = true;
paymentSelect.children[1].setAttribute('selected', true);


//******** Event listener for payment type selection ********//
paymentSelect.addEventListener('change', e => {

    if(e.target.value === 'credit-card'){
        //  Display credit card input fields
        paypal.hidden = true;
        bitcoin.hidden = true;
        creditCard.hidden = false;
    } else if(e.target.value === 'paypal'){
        //  Display paypal information 
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;
    } else if(e.target.value === 'bitcoin'){
        //  Display bitcoin information  
        paypal.hidden = true;
        bitcoin.hidden = false;
        creditCard.hidden = true;
    }
});

//*** Form validation***//
regForm.addEventListener('submit', e => {

    /*** Name validation ***/
    let nameIsValid = validateInput(nameInput, nameCheck);

    /*** Email validation ***/
    let emailIsValid = validateInput(emailAddress, emailCheck);

    // Register for activities validation 
    let activityRegistered = checkRegistration();
    
    // Validate credit card
    let ccIsValid = creditCardValidation();

    //e.preventDefault();
    if (nameIsValid === false || emailIsValid === false || activityRegistered === false || ccIsValid === false) { 
        e.preventDefault();
    }

});

//*** Accessibility for activities (blur & focus events) ***//
for(let i=0; i < activityCheckBoxes.length; i++) {
    // Blur event
    activityCheckBoxes[i].addEventListener('blur', () =>{
        activityCheckBoxes[i].parentElement.classList.remove('focus');
    });
    // Focus event
    activityCheckBoxes[i].addEventListener('focus', () =>{
        activityCheckBoxes[i].parentElement.classList.add('focus');
    });
}

//*** Event listener to prevent attendee from double booking workshops ***//
regForActivities.addEventListener('click', e => {
    let workshopTime = e.target.getAttribute('data-day-and-time');
    //Loop through workshops
    for(let i = 0; i < activityCheckBoxes.length; i++){
        let checkedWsTime = activityCheckBoxes[i].getAttribute('data-day-and-time');
        if(e.target.checked){
            // Disable conflicting workshop
            if(workshopTime === checkedWsTime && e.target !== activityCheckBoxes[i]) {
                activityCheckBoxes[i].disabled = true;
                activityCheckBoxes[i]. parentNode.classList.add("disabled");
            } else if (workshopTime !== checkedWsTime && activityCheckBoxes[i].disabled === true){
                activityCheckBoxes[i].disabled = true; // Keep conflicting workshop disabled
            } else {
                activityCheckBoxes[i].diabled = false; // Keep non-conflicting workshop active
            }
        // Keep selected checked    
        } else if (workshopTime === checkedWsTime && !e.target.checked) {
            activityCheckBoxes[i].disabled = false;
            activityCheckBoxes[i].parentNode.className = "";
        }
    }
});

//******* Realtime validation of credit card number *******//
creditCardNum.addEventListener('keyup', e => {
    // If input is not valid
    if(creditCardCheck.test(e.target.value) === false) {
        creditCardNum.parentNode.classList.remove("valid");
        creditCardNum.parentNode.classList.add("not-valid");

        if(e.target.value.length == "") {
            creditCardNum.parentElement.lastElementChild.innerHTML = 'Credit card field must be filled it!';
            creditCardNum.parentElement.lastElementChild.style.display = "inline";   
        } else if (e.target.value.length < 13) {
            e.target.parentElement.lastElementChild.innerHTML = 'Credit card number must be between 13-16 digits!';
            e.target.parentElement.lastElementChild.style.display = "inline";
        } else if (e.target.value.length > 16) {
            e.target.parentElement.lastElementChild.innerHTML = 'Credit card number must not be more than 16 digits!';
            e.target.parentElement.lastElementChild.style.display = "inline";
        }  
        validPayment = false;
    }  // If input is valid
    else {
        creditCardNum.parentNode.classList.remove("not-valid");
        creditCardNum.classList.remove("error-border");
        creditCardNum.parentNode.classList.add("valid");
        creditCardNum.parentElement.lastElementChild.style.display = 'none';
        validPayment = true;
        console.log(validPayment);
    }
});
