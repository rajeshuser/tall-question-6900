// localStorage keys
// (following key has been used to detect user login status)
// "user" = {
// 		usernmae: "abc",
// 		redeemedOffers: ["ADD 2 PC HOT N CRISPY CHICKEN"]
// }
// "orderSettings" = {
// 		type: "Delivery",
// 		address: "Delhi",
// 		time: "2022-12-22"
// }

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
const greetingsElement = document.querySelector("#greetings");
const orderTypeElements = document.querySelectorAll("#order-types > button");
const redeemElements = document.querySelectorAll(".redeem-button");
const redeemFeedbackModal = document.querySelector("#redeem-feedback-modal");
const offers = {
	"1": "2 PC HOT CHICKEN ZINGER",
	"2": "2 PC HOT VEG ZINGER",
	"3": "2 PC CRISPY CHICKEN"
}

let slideIndex = 0;

startSlideShow();
updateGreetings();

// all addEventListner() are below

slideButtonLeft.addEventListener("click", (event) => {
	slideIndex -= 2;
	if(slideIndex < 0) {
		slideIndex = slideShowImages.length + slideIndex;
	}
	showSlide();
});

slideButtonRight.addEventListener("click", showSlide);

orderTypeElements.forEach((item) => item.addEventListener("click", (event) => {
	let orderType = event.target.value;
	console.log(orderType);
	let orderSettings = JSON.parse(localStorage.getItem("orderSettings"));
	if(orderSettings===null) {
		orderSettings = {
			type: orderType
		}
	} else {
		orderSettings.type = orderType;
	}
	localStorage.setItem("orderSettings", JSON.stringify(orderSettings));
	updateOrderType();
}));

redeemElements.forEach((item) => item.addEventListener("click", (event) => {
	let redeemedOfferId = event.target.dataset.offerid;
	// store the offer
	let user = JSON.parse(localStorage.getItem("user"));
	if(user===null) {
		alert("Please login first to redeem offer");
		return;
		user = {
			username: "Ananya Pandey",
			redeemedOffersIds: []
		};
	} else if(user.redeemedOffers===undefined) {
		user.redeemedOffers = [];
	} 
	user.redeemedOffers.push(offers[redeemedOfferId]);
	// removing duplicates offers
	console.log(user)
	let set = new Set(user.redeemedOffers);
	user.redeemedOffers = [];
	for(let offer of set) {
		user.redeemedOffers.push(offer);
	}
	localStorage.setItem("user", JSON.stringify(user));
	toggleRedeemFeedbackModal();
}));

// all functions are below

function updateGreetings() {
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

function toggleRedeemFeedbackModal(event) {
	console.log("hello")
	redeemFeedbackModal.classList.toggle("toggle-redeem-feedback-modal");
}

function updateOrderType() {
	let orderSettings = JSON.parse(localStorage.getItem("orderSettings"));
	if(orderSettings===null) {
		return;
	}
	console.log(orderSettings);
	for(let button of orderTypeElements) {
		if(orderSettings.type===button.value) {
			button.classList.add("selected-order-type");
		} else {
			button.classList.remove("selected-order-type");
		}
	}
}

redeemFeedbackModal.onclick = function(event) { 
	if(event.target===redeemFeedbackModal) {
		toggleRedeemFeedbackModal();
	}
};