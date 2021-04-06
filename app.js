const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");


//******* Name Fade ********//

window.onload = setTimeout(function () {document.getElementById("myName").style.opacity = 1;}, 1000);


//******* Hamburger Menu ********// 

hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
    if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
      console.log(menu);
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      menu.classList.add("showMenu");
      console.log(menu);
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
    }
  }

const menuLinks = document.querySelectorAll(".menuLink");

menuLinks.forEach( 
    function(menuLink) { 
      menuLink.addEventListener("click", toggleMenu);
    }
  );