const redeemElements = document.querySelectorAll(".redeem-button");
const redeemFeedbackModal = document.querySelector("#redeem-feedback-modal");


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


function toggleRedeemFeedbackModal(event) {
	console.log("hello")
	redeemFeedbackModal.classList.toggle("toggle-redeem-feedback-modal");
}

redeemFeedbackModal.onclick = function(event) { 
	if(event.target===redeemFeedbackModal) {
		toggleRedeemFeedbackModal();
	}
};