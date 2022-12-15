// localStorage keys
// (following key has been used to detect user login status)
// "user" = {
// 		usernmae: "abc",
// 		redeemedOffersIds: ["1", "2", "3"];
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

let slideIndex = 0;

startSlideShow();
updateGreetings();

/*
updateOrderType();
updateAddressBar();
*/

// all addEventListner() are below

slideButtonLeft.addEventListener("click", (event) => {
	slideIndex -= 2;
	if(slideIndex < 0) {
		slideIndex = slideShowImages.length + slideIndex;
	}
	showSlide();
});

slideButtonRight.addEventListener("click", showSlide);
 
/*
hamburgerElement.addEventListener("click", (event) => {
	navOptionsElement.classList.toggle("toggle-display");
});

orderSettingElement.addEventListener("click", toggleOrderSettingsModal);
*/

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
	let user = JSON.parse(localStorage.getItem("user", "redeemedOffersIds"));
	if(user===null) {
		alert("Please login first to redeem offer");
		return;
		user = {
			username: "Ananya Pandey",
			redeemedOffersIds: []
		};
	} else if(user.redeemedOffersIds===undefined) {
		user.redeemedOffersIds = [];
	} 
	user.redeemedOffersIds.push(redeemedOfferId);
	// removing duplicates offers
	console.log(user)
	let set = new Set(user.redeemedOffersIds);
	user.redeemedOffersIds = [];
	for(let offerId of set) {
		user.redeemedOffersIds.push(offerId);
	}
	localStorage.setItem("user", JSON.stringify(user));
	console.log("final");
	toggleRedeemFeedbackModal();
}));

/*
orderSettingsFormElement.addEventListener("submit", function(event) {
	event.preventDefault();
	let orderSettings = {
		type: orderSettingsFormElement[0].value,
		address: orderSettingsFormElement[1].value,
		time: orderSettingsFormElement[2].value,
	}
	console.log(orderSettings);
	if(orderSettings.type==="" || orderSettings.address==="" || orderSettings.time==="") {
		// form validation
		alert("Please fill all the fields");
		return;
	}
	localStorage.setItem("orderSettings", JSON.stringify(orderSettings));
	toggleOrderSettingsModal();
	updateOrderType();
	updateAddressBar();
	event.target.reset();
});
*/


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

/*
function toggleOrderSettingsModal(event) {
	orderSettingsModal.classList.toggle("toggle-order-settings-modal");
}
*/

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

/*
function updateAddressBar() {
	let orderSettings = JSON.parse(localStorage.getItem("orderSettings"));
	addressElement.innerText = orderSettings.address || "Select your order details";
	console.dir(addressElement)
}
*/

// onclick events are handled below

/*
orderSettingsModal.onclick = function(event) {
	// onclick is fired when the mouse is clicked inside the box and it do not care about its exposure
	// event.target checks the topmost element on which the mouse is clicked
	if(event.target===orderSettingsModal) {
		toggleOrderSettingsModal();
	}
};
*/

redeemFeedbackModal.onclick = function(event) { 
	if(event.target===redeemFeedbackModal) {
		toggleRedeemFeedbackModal();
	}
};