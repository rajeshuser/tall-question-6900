const slideShowImages = [
	"resources/slideShowImages/slide1.webp",
	"resources/slideShowImages/slide2.webp",
	"resources/slideShowImages/slide3.webp",
	"resources/slideShowImages/slide4.webp",
	"resources/slideShowImages/slide5.webp",
];
const slideButtonLeft = document.querySelector("#slide-buttons :nth-child(1)");
const slideButtonRight = document.querySelector("#slide-buttons :nth-child(2)");
const slideElement = document.querySelector("#slide-show>img");
const hamburgerElement = document.querySelector("#hamburger");
const navOptionsElement = document.querySelector("#nav-options");
const greetingsElement = document.querySelector("#greetings");
let slideIndex = 0;

startSlideShow();
updateGreetings();

// all addEventListner()

slideButtonLeft.addEventListener("click", (event) => {
	slideIndex -= 2;
	if(slideIndex < 0) {
		slideIndex = slideShowImages.length + slideIndex;
	}
	showSlide();
});

slideButtonRight.addEventListener("click", showSlide);

hamburgerElement.addEventListener("click", (event) => {
	navOptionsElement.classList.toggle("toggle-display");
});


// all functions are below

function updateGreetings() {
	// localStorage key when the user loggen in
	// user = {username: abc}
	user = JSON.parse(localStorage.getItem("user"));
	greetingsElement.innerText = user===null ? "Welcome to KPC!" : `Welcome back ${user.username}!`;
}

function startSlideShow() {
	let id = setInterval(showSlide, 3000);
}

function showSlide() {
	slideIndex = (slideIndex+1) % slideShowImages.length;
	slideElement.src = slideShowImages[slideIndex];
}
