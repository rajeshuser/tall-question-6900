// the user login status is detected using "localStorage"

const productURL = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc";
const usersURL = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user";
const main = document.querySelector("#main");
const userFromLocalStoarge = JSON.parse(localStorage.getItem("user"));

if(userFromLocalStoarge===null) {
	loadCartEmptyMessage();
} else {
	loadCartProducts();
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

async function loadCartProducts() {
	let response = await fetch(`${usersURL}/${userFromLocalStoarge.id}`);
	let user = await response.json();
	let cartProducts = user.cart;
	// here, put some dummy products in "cartProducts", later do delete it
	if(cartProducts.length===0) {
		loadCartEmptyMessage();
		return;
	}
	main.innerHTML = `
		<div id="cartProductsDiv">
			${
				cartProducts
					.map(product => getProductHTML(product))
					.join("")
			}
		</div>
	`;
}

function getProductHTML(product) {
	let productHTML = `
		<div class="product">
			<div class="productImageDiv">
				<img src="${product.image}">
			</div>
			<div class="productTextDiv">
				<h2>${product.Title}</h2>
				<p>Non veg | Serves 2-3</p>
				<h2>Rs. ${product.price}</h2>
				<p>${product.description}</p>
			</div>
		</div>
	`;
	return productHTML;
}