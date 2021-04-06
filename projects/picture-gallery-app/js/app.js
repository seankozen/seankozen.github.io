
baguetteBox.run('.gallery');


/********************************************** 
Picture Search function
Site consulted: 
https://www.geeksforgeeks.org/search-bar-using-html-css-and-javascript/
***********************************************/

//Event listener for search box input and function call
document.getElementById("search").addEventListener("keyup", picSearch);

function picSearch() {
    //Gets input and continuously saves to "input"
    let input = document.getElementById("search").value;

    //Stores "input" in "searchItem" in all lowercase
    let searchItem = input.toLowerCase();

    //Gets all images with "a" tag
    let images = document.getElementsByTagName("a");

    for (let i= 0; i < images.length; i++) {
        if (images[i].getAttribute("data-caption").includes(searchItem)) {
            images[i].style.display = "";
        } else {
            images[i].style.display = "none";
        }    
    }
}