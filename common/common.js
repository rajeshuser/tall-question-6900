<<<<<<< HEAD
const rootFolder = "C:/Users/RanjanKr/Desktop/123456/tall-question-6900"
=======
const rootFolder = "C:/Users/chowd/OneDrive/Desktop/tall-question-6900"
>>>>>>> d0781677ef8e758898971c77eb541bcf0974b4fc
const navBarElement = document.querySelector("#nav-bar");
const orderSettingBarElement = document.querySelector("#order-settings1");
const orderSettingsModal =document.querySelector("#order-settings-modal");
const footerElement = document.querySelector("#footer");

createNecessaryKeysInLocalStorage();

navBarElement.innerHTML = `
	<div class="logo">
		<a href="${rootFolder}/index.html"><img src="${rootFolder}/resources/logo.png" alt="logo"></a>
	</div>
	<h1>KPC</h1>
	<button id="hamburger">
		<img src="${rootFolder}/resources/hamburger.png" alt="hamburger">
	</button>
	<ul id="nav-options">
		<li><a href="${rootFolder}/menu/menu.html">Menu</a></li>
		<li><a href="${rootFolder}/deals/deals.html">Deals</a></li>
		<li><a href="${rootFolder}/account/account.html">Account</a></li>
		<li><a href="${rootFolder}/cart/cart.html">Cart</a></li>
	</ul>
`;
orderSettingBarElement.innerHTML = `
	<p>Select your order details</p>
	<button>Set order</button>
`;
orderSettingsModal.innerHTML = `
	<div id="order-settings-modal-content">
		<h1>Order Settings</h1>
		<form action="">
			<label for="order-type">Order type</label>
			<select name="order-type" id="order-type" name="orderType">
				<option value="Delivery">Delivery</option>
				<option value="Pick up">Pick up</option>
				<option value="Dine in">Dine in</option>
			</select>
			<label for="delivery-address">Delivery address</label>
			<input type="text" id="delivery-address" name="deliveryAddress">
			<label for="delivery-time">Delivery time</label>
			<input type="time" id="delivery-time" name="deliveryTime">
			<input type="submit" value="Confirm">
		</form>
	</div>
`;
footerElement.innerHTML = `
	<div class="logo">
		<a href="home.html"><img src="${rootFolder}/resources/logo.png" alt="logo"></a>
	</div>
	<ul>
		KPC Food
		<li>Menu</li>
		<li>Order Lookup</li>
		<li>Gift Card</li>
		<li>Privacy Policy</li>
	</ul>
	<ul>
		Support
		<li>Get Help</li>
		<li>Contact Us</li>
		<li>KPC Feedback</li>
		<li>Nutrition & Allergen</li>
	</ul>
	<ul>
		Legal
		<li>Terms and Conditions</li>
		<li>Privacy Policy</li>
		<li>Disclaimer</li>
		<li>Caution Notice</li>
	</ul>
	<ul>
		KPC India
		<li>About KFC</li>
		<li>KFC Care</li>
		<li>Careers</li>
		<li>Our Golden Past</li>
	</ul>
	<div id="find-kpc">
		Find KPC
	</div>
	<div id="app-stores">
		<a href="https://play.google.com"><img src="${rootFolder}/resources/socialMediaLogos/google_play.svg" alt="googlePlay"></a>
		<a href="https://www.apple.com"><img src="${rootFolder}/resources/socialMediaLogos/apple.svg" alt="appStore"></a>
	</div>
	<p id="copyright">Copyright © KPC Corporation 2021 All Rights Reserved</p>
	<div id="media-links">
		<a href="https://www.instagram.com"><img src="${rootFolder}/resources/socialMediaLogos/Social_Insta_White.svg" alt="instagram"></a>
		<a href="https://www.facebook.com"><img src="${rootFolder}/resources/socialMediaLogos/Social_Facebook_White.svg" alt="facebook"></a>
		<a href="https://www.twitter.com"><img src="${rootFolder}/resources/socialMediaLogos/Social_Twitter_White.svg" alt="twitter"></a>
	</div>
`;

const hamburgerElement = document.querySelector("#hamburger");
const navOptionsElement = document.querySelector("#nav-options");
const orderSettingElement = document.querySelector("#order-settings1 > button");
const orderSettingsFormElement = document.querySelector("#order-settings-modal-content > form");
const addressElement = document.querySelector("#order-settings1 > p");

updateAddressBar();

hamburgerElement.addEventListener("click", (event) => {
	navOptionsElement.classList.toggle("toggle-display");
});

orderSettingElement.addEventListener("click", toggleOrderSettingsModal);

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
	if(updateOrderType!==undefined) {
		// "updateOrderType" function is available and needed only for homepage
		updateOrderType();
	}
	updateAddressBar();
	event.target.reset();
});

function toggleOrderSettingsModal(event) {
	orderSettingsModal.classList.toggle("toggle-order-settings-modal");
}

function updateAddressBar() {
	let orderSettings = JSON.parse(localStorage.getItem("orderSettings"));
	addressElement.innerText = orderSettings.address || "Select your order details";
	console.dir(addressElement)
}

orderSettingsModal.onclick = function(event) {
	// onclick is fired when the mouse is clicked inside the box and it do not care about its exposure
	// event.target checks the topmost element on which the mouse is clicked
	if(event.target===orderSettingsModal) {
		toggleOrderSettingsModal();
	}
};

function createNecessaryKeysInLocalStorage() {
	// pages using common.js should load the common.js first then the remaining scripts can be loaded
	// this function should run as soon as common.js script is loaded
	if(localStorage.getItem("orderSettings")===null) {
		let orderSettings = {
			type: "Delivery",
			address: "Delhi",
			time: "2022-12-22"
		}
		localStorage.setItem("orderSettings", JSON.stringify(orderSettings));
	}
}
