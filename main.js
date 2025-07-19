const form = document.querySelector("form");
const email = document.getElementById("email");
const nameInput = document.getElementById("name");
const message = document.getElementById("message");
const navMenu = document.querySelector("nav");
const menuIcon = document.querySelector(".menu-icon");
const arrowLeft = document.querySelector(".left");
const arrowRight = document.querySelector(".right");

// Toggle nav menu
menuIcon.addEventListener("click", (e) => {
    navMenu.classList.toggle("nav-display");
})
// Slides auto controller

// let slideIndex = 0;
// showSlides();

// function showSlides() {
//     let i;
//     let slides = document.querySelectorAll(".slide");
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) { slideIndex = 1 };
//     slides[slideIndex - 1].style.display = "flex";
//     setTimeout(showSlides, 5000);
// }

//Slides manual controller

let slideIndex = 1;
showSlides(slideIndex);

arrowLeft.addEventListener("click", () => {
    plusSlides(-1)
})
arrowRight.addEventListener("click", () => {
    plusSlides(1)
})

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

// Form validation
//check user entries
email.addEventListener("input", (e) => {
    checkInput(email, e);
})
nameInput.addEventListener("input", (e) => {
    checkInput(nameInput, e);
})
message.addEventListener("input", (event) => {
    checkInput(message, event)
})

form.addEventListener("submit", (event) => {
    if (!nameInput.validity.valid || !email.validity.valid || !message.validity.valid) {
        alert("Your data is incomplete");
        event.preventDefault();
    } else {
        alert("Thanks! Your data was submitted successfully.")
    }
})

function showError(e) {
    const el = e.target;
    if (el.validity.valueMissing) {
        document.querySelector(`.error-${el.name}`).textContent = `You need to enter your ${el.name}`
    }
    if (el.validity.typeMismatch) {
        document.querySelector(`.error-${el.name}`).textContent = `Entered value needs to be a ${el.name}.`
    } if (el.validity.patternMismatch) {
        document.querySelector(`.error-${el.name}`).textContent = `Entered value does not match required pattern of ${el.name}.`
    }
    if (el.validity.tooShort) {
        document.querySelector(`.error-${el.name}`).textContent = `${el.name.charAt(0).toUpperCase() + el.name.slice(1)} length should be at least ${el.minLength} characters long`;
    }
}

function checkInput(input, event) {
    const el = event.target;
    if (input.validity.valid) {
        document.querySelector(`.error-${el.name}`).textContent = ""
    }
    else {
        showError(event);
    }
}