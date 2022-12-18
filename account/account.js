class loginClass {
    // this class handles all the things when user is not logged in

	toggleAdminButton(boolean=false) {
		document.querySelector("#adminAnchor").classList.toggle("adminAnchor", boolean);
	}

    loadEmailForm() {
		this.toggleAdminButton(false);
        main.innerHTML = `
			<form id="emailForm">
				<label for="email"> Enter your email address </label>
				<input type="email" id="email">
				<input type="submit">
			</form>
		`;
        let loginObject = this;
        document.querySelector("#emailForm").addEventListener("submit", async function (event) {
            // "this" inside "addEventListener" refers to the element to which the "eventHandler" is being attached
            event.preventDefault();
            let email = event.target.children.email.value;
            if (email === "") {
                alert("Please enter the email");
                return;
            }
            let isEmailPresent = await loginObject.isEmailAlreadyExist(email);
            if (isEmailPresent === true) {
                loginObject.loadPasswordForm();
            } else {
                alert("You do not have an account. Please create new account");
                loginObject.loadCreateAccountForm();
            }
        });
    }

    loadPasswordForm() {
		this.toggleAdminButton(true);
        // here the "localStorage" will have the user stored under the key "user"
        main.innerHTML = `
			<form id="passwordForm">
				<label for="password"> Enter your password </label>
				<input type="password" id="password">
				<input type="submit">
			</form>
		`;
        document.querySelector("#passwordForm").addEventListener("submit", function (event) {
            event.preventDefault();
            let password = event.target.children.password.value;
            if (password === "") {
                alert("Please enter the password");
                return;
            }
            let localStorageUserPassword = JSON.parse(localStorage.getItem("user")).password;
            if (password === localStorageUserPassword) {
                alert("Login successful");
                accountObject.loadAccountInfo();
            } else {
                alert("Oops! You have entered wrong password");
            }
        });
    }

    async isEmailAlreadyExist(email) {
        try {
            let response = await fetch(`${usersURL}?email=${email}`);
            let user = (await response.json())[0];
            if (user === undefined) {
                return false;
            } else {
                // if there exist a user with the input email address, he will stored in "localStorage" under the key "user"
                localStorage.setItem("user", JSON.stringify(user));
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }

    loadCreateAccountForm() {
		this.toggleAdminButton(false);
        main.innerHTML = `
			<form id="createAccountForm">
				<h2> Create account </h2>
				<div id="names">
					<div>
						<label for="firstName"> First name </label>
						<input type="text" id="firstName" required>
					</div>
					<div>
						<label for="lastName"> Last name </label>
						<input type="text" id="lastName" required>
					</div>
				</div>
				<label for="email"> Email </label>
				<input type="email" id="email" required>
				<label for="password"> Password </label>
				<input type="password" id="password" required>
				<input type="submit">
			</form>
		`;
        document
            .querySelector("#createAccountForm")
            .addEventListener("submit", async function (event) {
                // ids of direct children of an element will become children itself inside the element
                event.preventDefault();
                let user = {
                    f_name: document.querySelector("#createAccountForm #firstName").value,
                    l_name: document.querySelector("#createAccountForm #lastName").value,
                    email: document.querySelector("#createAccountForm #email").value,
                    password: document.querySelector("#createAccountForm #password").value,
                    username:
                        document.querySelector("#createAccountForm #firstName").value +
                        " " +
                        document.querySelector("#createAccountForm #lastName").value,
                };
                try {
                    let response = await fetch(usersURL, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(user),
                    });
                    if (response.ok === true) {
                        localStorage.setItem("user", JSON.stringify(user));
                        accountObject.loadAccountInfo();
                    }
                } catch (error) {
                    console.log(error);
                }
            });
    }
}

class accountInfoClass {
    // this class handles all the things when user is logged in

    loadAccountInfo() {
        main.innerHTML = `
			<div id="optionsCard">
				<h2>Good day</h2>
				<button id="ordersOption">Orders</button>
				<button id="favoritesOption">Favorites</button>
				<button id="userProfileOption">Profile</button>
				<button id="signOut">Sign Out</button>
			</div>
			<div id="optionContent">

			</div>
		`;

        let accountObject = this;
		let optionContent = document.querySelector("#optionContent");

		document.querySelector("#ordersOption").addEventListener("click", async function (event) {
			let user = JSON.parse(localStorage.getItem("user"));
			let response = await fetch(`https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user/${user.id}`);
			user = await response.json();
			accountObject.renderProductsInOptionContent(user.ordered_product);
        });

		document.querySelector("#favoritesOption").addEventListener("click", async function (event) {
			let user = JSON.parse(localStorage.getItem("user"));
			let response = await fetch(`https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user/${user.id}`);
			user = await response.json();
			accountObject.renderProductsInOptionContent(user.fav_product);
        });

        document.querySelector("#userProfileOption").addEventListener("click", function (event) {
            optionContent.innerHTML = `
				<h2>Profile</h2>
				${accountObject.getUserInfoHTML()}
			`;
        });
		document.querySelector("#userProfileOption").click();
		
		document.querySelector("#signOut").addEventListener("click", function (event) {
            localStorage.removeItem("user");
			loginObject.loadEmailForm();
        });
    }

    getUserInfoHTML() {
        let user = JSON.parse(localStorage.getItem("user"));
        let userInfoHTML = `
			<table>
				<tr> <td>Name</td> <td>${user.f_name} ${user.l_name}</td> </tr>
				<tr> <td>Email</td> <td>${user.email}</td> </tr>
				<tr> <td>Address</td> <td>${user.address || "G1-a, Hatkesh Udyog Nagar, Mira Bhayander Road, Mira Bhayander Road, Mumbai"}</td> </tr>
			</table>
		`;
        return userInfoHTML;
    }

	async renderProductsInOptionContent(productIds) {	
		let products = [];
		for(let productId of productIds) {
			try {
				let response = await fetch(`${productsURL}/${productId}`);
				// for HTTP Error 404 and 500, the fetch do not throw any error, but the response.ok will be "false"
				if(response.ok) {
					// showing only those items that are present in the backend even though user has it in the cart or favorites
					let product = await response.json();
					products.push(product);
				}	 
			} catch(error) {
				console.log(error);
			}
		}
		if(products.length==0) {
			optionContent.innerHTML = `
				<h2 style="width:100%;margin: 15% auto;text-align:center">Oh ohh! Nothing is here</h2>
			`;
			return;
		}
		optionContent.innerHTML = `
			<div id="productsGrid">
				${
					products
						.map(product => this.getProductHTML(product))
						.join("")
				}
			</div>
		`;
	}

	getProductHTML(product) {
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
}

let main = document.querySelector("#main");
let user = JSON.parse(localStorage.getItem("user"));
const productsURL = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc";
const usersURL = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user";
const loginObject = new loginClass();
// "loginObject" should be used only after "accountObject"
const accountObject = new accountInfoClass();

if (user === null) {
    loginObject.loadEmailForm();
} else {
    accountObject.loadAccountInfo();
}
