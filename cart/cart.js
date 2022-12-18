// the user login status is detected using "localStorage"

const productURL = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc";
const main = document.querySelector("#main");
const checkoutModal = document.querySelector("#checkoutModal");
const checkoutModalContent = document.querySelector("#checkoutModalContent");
const userFromLocalStoarge = JSON.parse(localStorage.getItem("user"));
let userURL = `https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user/${userFromLocalStoarge.id}`;
const quantities = {};
let cartProducts = [];

if (userFromLocalStoarge === null) {
    loadCartEmptyMessage();
} else {
    loadCartDetails();
}

checkoutModal.onclick = function(event) {
	if(event.target===checkoutModal) {
		toggleCheckoutModal();
	}
}

function loadCartEmptyMessage() {
    // this message is just to encourage the user to buy products even though he already brought something
    main.innerHTML = `
		<div id="emptyCartMessageDiv">
			<h1> Your cart is empty </h1>
			<a href="../menu/menu.html" id="startOrderAnchor">Start order</a>
		</div>
	`;
}

async function loadCartDetails() {
    let response = await fetch(userURL);
    let user = await response.json();
    let cartProductsIds = user.cart;
    cartProducts = [];
    for (let productId of cartProductsIds) {
        let response = await fetch(`${productURL}/${productId}`);
        if (response.ok) {
            let p = await response.json();
            cartProducts.push(p);
        }
    }
    if(cartProducts.length === 0) {
        loadCartEmptyMessage();
        return;
    }
    for (let productId of cartProductsIds) {
        quantities[productId] = 1;
    }
    main.innerHTML = `
		<div id="cartDetails">
			<div id="cartBillAndCheckoutDiv">
				<div id="cartBillDiv">
					Total bill = Rs. <span id="cartBill"> 100 </span>
				</div>
				<button id="buyButton">Buy now</button>
			</div>
			<div id="productsGrid">
				${cartProducts.map((product) => getProductHTML(product)).join("")}
			</div>
		</div>
	`;
    addEventListenerToButtons();
	updateTotalBill();
}

function addEventListenerToButtons() {
	let buyButton = document.querySelector("#buyButton");
	buyButton.addEventListener("click", toggleCheckoutModal);

    let increaseButtons = document.querySelectorAll(".increase");
    for (let increaseButton of increaseButtons) {
        increaseButton.addEventListener("click", function (event) {
			let productId = increaseButton.dataset.id;
            quantities[productId]++;
            updateQuantitiesInLocalStorage();
			let span = increaseButton.parentElement.children[0];
			span.innerText = quantities[productId];
			updateTotalBill();
        });
    }

    let decreaseButtons = document.querySelectorAll(".decrease");
    for (let decreaseButton of decreaseButtons) {
        decreaseButton.addEventListener("click", function (event) {
			let productId = decreaseButton.dataset.id;
			if (quantities[productId] > 1) {
				quantities[productId]--;
				updateQuantitiesInLocalStorage();
				let span = decreaseButton.parentElement.children[0];
				span.innerText = quantities[productId];
				updateTotalBill();
			} 
        });
    }

	let removeButtons = document.querySelectorAll(".remove");
    for (let removeButton of removeButtons) {
        removeButton.addEventListener("click", function (event) {
			let productId = removeButton.dataset.id;
            // remove product removeButton.dataset.id from cart of the user
			removeProductIdFromCartOfUser(userFromLocalStoarge, productId);
            delete quantities[removeButton.dataset.id];
            updateQuantitiesInLocalStorage();
			updateTotalBill();  
        });
    }
}

function toggleCheckoutModal() {
	let isCheckoutModalOpen = checkoutModal.classList.toggle("toggleCheckoutModal");
	console.log(isCheckoutModalOpen)
	if(isCheckoutModalOpen===false) {
		return;
	}
	checkoutModalContent.innerHTML = `
		<h1>Order details</h1>
		<h3>Order summary</h3>
		<table id="orderSummary">
			<tr>
				<td> Total bill </td>
				<td id="totalBill"> ${getCartBill()} <td>
			</tr>
			<tr>
				<td> GST (18%) </td>
				<td id="gst"> ${0.18 * getCartBill()} <td>
			</tr>
			<tr>
				<td> Gross total </td>
				<td id="grossTotal"> ${1.18 * getCartBill()} <td>
			</tr>
			<tr>
				<td> Offers </td>
				<td> 
					${JSON.parse(localStorage.getItem("user")).redeemedOffers[0] || "No offers redeemed"}
				</td>
			</tr>
		</table>
		<h3>Delivery address</h3>
		<p>${
			JSON.parse(localStorage.getItem("orderSettings")).address 
			|| JSON.parse(localStorage.getItem("user")).address 
		}</p>
		<h3>Card details</h3>
		<form id="paymentForm">
			<label>Card Holder Name<input type="text" id="cardHolderName" required></label>
			<label>Card Number<input type="number" id="cardNumber" required></label>
			<label>Expiry Date<input type="month" id="expiryDate" required></label>
			<label>CVV Number<input type="number" id="cvvNumber" required></label>
			<label><input type="submit" value="Make payment"></label>
		</form>
	`;
	let paymentForm = document.querySelector("#paymentForm");
	paymentForm.addEventListener("submit", handlePaymentForm);
}

function handlePaymentForm(event) {
	event.preventDefault();
	let form = event.target;
	let card = {
		cardHolderName: document.querySelector("#cardHolderName").value,
		cardNumber: document.querySelector("#cardNumber").value,
		expiryDate: document.querySelector("#expiryDate").value,
		cvvNumber: document.querySelector("#cvvNumber").value,
	}
	if(card.cardNumber.length!=12) {
		alert("Card number should be 12 digits");
		return;
	}
	if(card.cvvNumber.length!=3) {
		alert("CVV number should be 3 digits");
		return;
	}
	moveProductIdsFromCartToOrdered();
}

async function moveProductIdsFromCartToOrdered() {
	try {
		let response = await fetch(userURL);
		let user = await response.json();
		user.ordered_product = user.cart;
		response = await fetch(userURL, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				"cart": [],
				"ordered_product": user.cart
			})
		});
		if(response.ok) {
			alert("You have placed the order successfully");
			location.reload();
		}
	} catch(error) {
		console.log(error);
	}
}

function updateTotalBill() {
	let cartBillElement = document.querySelector("#cartBill");
	cartBillElement.innerText = getCartBill();
}

function getCartBill() {
	let cartBill = 0;
	for(let product of cartProducts) {
		cartBill += product.price * quantities[product.Product_id];
	}
	return cartBill;
}

async function removeProductIdFromCartOfUser(userFromLocalStoarge, productId) {
	try {
		let response = await fetch(userURL);
		if(response.ok===true) {
			let user = await response.json();
			// removing productId from cart of user
			user.cart = user.cart.filter(pId => pId!=productId);
			// API can only update the first level keys of the object, it do not travel into depth of the object
			// updating user in API
			response = await fetch(userURL, {
				method: "PUT",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({"cart": user.cart})
			});
			if(response.ok) {
				loadCartDetails();
				alert("Product removed from the cart");
			} else {
				alert("Something went wrong!");
			}
		} else {
			alert("User not found");
		}
	} catch(error) {
		console.log(error);
	}
} 

function updateQuantitiesInLocalStorage() {
    localStorage.setItem("quantities", JSON.stringify(quantities));
}

function getProductHTML(product) {
    let productHTML = `
		<div class="product">
			<div class="productImageDiv">
				<img src="${product.image}">
			</div>
			<div class="productTextDiv">
				<h2 class="productTitle">${product.Title}</h2>
				<p>Can serve upto 2-3</p>
				<h2>Rs. ${product.price}</h2>
				<p>${product.description}</p>
				<div class="productQuantity">
					Qty:
					<span class="quantity" data-id=${product.Product_id}> 1 </span>
					<button class="increase" data-id=${product.Product_id}> + </button>
					<button class="decrease" data-id=${product.Product_id}> - </button>
				</div>
				<button class="remove" data-id=${product.Product_id}>Remove</button>
			</div>
		</div>
	`;
    return productHTML;
}
