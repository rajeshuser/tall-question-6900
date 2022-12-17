const user = {
  f_name: "Albert",
  l_name: "McKenzie",
  avatar:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/546.jpg",
  password: "password 1",
  email: "Roy.Wolf89@example.org",
  username: "Gregoria.Rogahn96",
  cart: [],
  Redeem_offer: [],
  fav_product: [],
  ordered_product: [],
  id: "1",
};
localStorage.setItem("user", JSON.stringify(user));

const orderSettings = {
  type: "Delivery",
  address: "Delhi",
  time: "2022-12-22",
};
localStorage.setItem("orderSettings", JSON.stringify(orderSettings));

//item fetching
let url = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc?page=1&limit=10";
let items = [];
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    items = data;
    displaycard(data);
  });

function displaycard(arr) {
  document.querySelector(".menu").innerHTML = "";
  arr.forEach((element) => {
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let Div = document.createElement("div");
    let Img = document.createElement("img");
    Img.setAttribute("src", element.image);
    let title = document.createElement("h3");
    title.innerText = element.Title;
    let desc = document.createElement("p");
    desc.innerText = element.description;
    let off = document.createElement("h5");
    off.innerText = `${element.offer}%`;
    let Price = document.createElement("h3");
    Price.innerText = element.price;

    let Wishlist = document.createElement("img");
    Wishlist.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/128/20/20119.png"
    );
    Wishlist.addEventListener("click", () => {
      addDatatoWishlist("cart", element.Product_id);
    });

    let btn = document.createElement("button");
    btn.innerText = "Add to Cart+";
    btn.addEventListener("click", () => {
      addData("cart", element.Product_id);
    });

    div.append(Img, Wishlist);
    div2.append(title, Price, off, desc, btn);
    Div.append(div, div2);
    document.querySelector(".menu").append(Div);
  });
}

let url1 = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc?page=2&limit=15";
let items1 = [];
fetch(url1)
  .then((res) => res.json())
  .then((data1) => {
    items1 = data1;
    displaycard1(data1);
  });

function displaycard1(arr) {
  document.querySelector(".menu1").innerHTML = "";
  arr.forEach((element) => {
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let Div = document.createElement("div");
    let Img = document.createElement("img");
    Img.setAttribute("src", element.image);
    let title = document.createElement("h3");
    title.innerText = element.Title;
    let desc = document.createElement("p");
    desc.innerText = element.description;
    let off = document.createElement("h5");
    off.innerText = `${element.offer}%`;
    let Price = document.createElement("h3");
    Price.innerText = element.price;

    let Wishlist = document.createElement("img");
    Wishlist.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/128/20/20119.png"
    );
    Wishlist.addEventListener("click", () => {
      addDatatoWishlist("cart", element.Product_id);
    });

    let btn = document.createElement("button");
    btn.innerText = "Add to Cart+";
    btn.addEventListener("click", () => {
      addData("cart", element.Product_id);
    });

    div.append(Img, Wishlist);
    div2.append(title, Price, off, desc, btn);
    Div.append(div, div2);
    document.querySelector(".menu1").append(Div);
  });
}

let url2 = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc?page=3&limit=10";
let items2 = [];
fetch(url2)
  .then((res) => res.json())
  .then((data2) => {
    items2 = data2;
    displaycard2(data2);
  });

function displaycard2(arr) {
  document.querySelector(".menu2").innerHTML = "";
  arr.forEach((element) => {
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let Div = document.createElement("div");
    let Img = document.createElement("img");
    Img.setAttribute("src", element.image);
    let title = document.createElement("h3");
    title.innerText = element.Title;
    let desc = document.createElement("p");
    desc.innerText = element.description;
    let off = document.createElement("h5");
    off.innerText = `${element.offer}%`;
    let Price = document.createElement("h3");
    Price.innerText = element.price;

    let Wishlist = document.createElement("img");
    Wishlist.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/128/20/20119.png"
    );
    Wishlist.addEventListener("click", () => {
      addDatatoWishlist("cart", element.Product_id);
    });

    let btn = document.createElement("button");
    btn.innerText = "Add to Cart+";
    btn.addEventListener("click", () => {
      addData("cart", element.Product_id);
    });

    div.append(Img, Wishlist);
    div2.append(title, Price, off, desc, btn);
    Div.append(div, div2);
    document.querySelector(".menu2").append(Div);
  });
}





//search function

function search() {
    let newitem=[...items,...items1,...items2]
  let ser = document.querySelector("#products>input").value;
  let newdata = newitem.filter(function (el) {
    return el.Title.toLowerCase().includes(ser.toLowerCase());
  });
  displaycard(newdata);

}


// add to cart function

async function addData(key, productId) {
  // getting user from api
  let user = JSON.parse(localStorage.getItem("user"));
   // delete this line later
  let url = `https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user/${user.id}`;
  let res = await fetch(url);
  user.cart.push(productId);

  // updating cart of the user
  let res2 = await fetch(url, {
    method: "PUT", // It should be "PATCH"
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  // updated successfully
  if (res2.ok) {
    alert("Product added to the cart on the api");
  }
}

async function addDatatoWishlist(key, productId) {
  let user = JSON.parse(localStorage.getItem("user"));
  
  let url = `https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user/${user.id}`;
  let res = await fetch(url);
  user.fav_product.push(productId) ;

  let res3 = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res3.ok) {
    alert("Product added to the fav_product on the api");
  }
}
