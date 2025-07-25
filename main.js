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
email.addEventListener("focusout", (e) => {
    checkInput(email, e);
})
email.addEventListener("focusin", (e) => {
    if (email.nextSibling.nodeName === "P") {
        email.nextSibling.style.display = "none";
    };
})

nameInput.addEventListener("focusout", (e) => {
    checkInput(nameInput, e);
})
nameInput.addEventListener("focusin", (e) => {
    if (nameInput.nextSibling.nodeName === "P") {
        nameInput.nextSibling.style.display = "none";
    };
})

message.addEventListener("focusout", (event) => {
    checkInput(message, event)
})
message.addEventListener("focusin", (e) => {
    if (message.nextSibling.nodeName === "P") {
        message.nextSibling.style.display = "none";
    };
})

form.addEventListener("submit", (event) => {
    if (!nameInput.validity.valid || !email.validity.valid || !message.validity.valid) {
        alert("Your data is incomplete");
        event.preventDefault();
    } else {
        localStorage.setItem("name", nameInput.value);
        alert(`Name ${localStorage.getItem("name")} is saved to localStorage`);
        alert("Thanks! Your data was submitted successfully.")
    }
})

function showError(e) {
    const el = e.target;
    if (el.validity.valueMissing) {

        const pEl = document.createElement('p');
        pEl.innerHTML = `You need to enter your ${el.name}`
        pEl.style.fontSize = "1.4rem";
        pEl.style.color = "red";
        el.parentNode.insertBefore(pEl, el.nextSibling);
    }
    if (el.validity.typeMismatch) {

        const pEl = document.createElement('p');
        pEl.innerHTML = `Entered value needs to be a ${el.name}.`
        pEl.style.fontSize = "1.4rem";
        pEl.style.color = "red";
        el.parentNode.insertBefore(pEl, el.nextSibling);
    }
    if (el.validity.patternMismatch) {

        const pEl = document.createElement('p');
        pEl.innerHTML = `Entered value does not match required pattern of ${el.name}.`
        pEl.style.fontSize = "1.4rem";
        pEl.style.color = "red";
        el.parentNode.insertBefore(pEl, el.nextSibling);
    }
    if (el.validity.tooShort) {

        const pEl = document.createElement('p');
        pEl.innerHTML = `${el.name.charAt(0).toUpperCase() + el.name.slice(1)} length should be at least ${el.minLength} characters long`
        pEl.style.fontSize = "1.4rem";
        pEl.style.color = "red";
        el.parentNode.insertBefore(pEl, el.nextSibling);
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
// Intersection Observer API
const target = document.querySelector(".header");

const options = {
    root: null,
    rootMargin: "20px",
    scrollMargin: "0px",
    threshold: 0,
};

const intersectionCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            let elem = entry.target;
            elem.style.position = "fixed";
            elem.style.width = '100%';
        }
    })
}

const observer = new IntersectionObserver(intersectionCallback, options);
observer.observe(target);

// Images Lazy Loading
const imgs = document.querySelectorAll('img')

const imagesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.getAttribute('data-src');
        imagesObserver.unobserve(entry.target);
    })
});

imgs.forEach(image => {
    imagesObserver.observe(image);
})