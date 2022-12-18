let procucturl = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc";
let userurl = "https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user";
let count = 0;
let otp = document.querySelector(".otp");
let edit1 = document.querySelector(".edit1");

window.addEventListener("load", () => {
    product();
})
async function product() {
    try {
        let res = await fetch(procucturl);
        let data = await res.json();
        // console.log(res)
        pagination_button(data.length);
    } catch (error) {
        console.log(error)
    }
}
function pagination_button(count) {
	let limit = 12;
    fetch(procucturl + `?p=1&l=${limit}`)
        .then(res => res.json())
        .then(data => renderdom(data));
    let totalNumberOfButtons = Math.ceil(count / limit);
    console.log(count)
    function asListOfButtons() {
        let arr = [];
        for (let i = 1; i <= totalNumberOfButtons; i++) {
            arr.push(`<button class="pagination" id = ${i} > ${i} </button>`);
        }
        console.log(arr)
        return arr.join('');
    }
    // console.log(asListOfButtons())
    let pages = document.querySelector("#pages");
    pages.innerHTML = `<div class=pagestyle>${asListOfButtons()}</div>`;


    let paginationButtons = document.querySelectorAll('.pagination');
    console.log(paginationButtons)
    // console.log(typeof(paginationButtons),"1234")
    for (let paginationButton of paginationButtons) {
        paginationButton.addEventListener('click', function (e) {
            let dataId = e.target.id;
            console.log(dataId)
            fetch(procucturl + `?p=${dataId}&l=10`)
                .then(res => res.json())
                .then(data => renderdom(data));
        })

    }

}
async function user() {
    try {
        let res = await fetch(userurl);
        let data = await res.json();
        user_data(data)
        // console.log(data)
    } catch (error) {
        console.log(error)
    }
}
// user()
function user_data(data){
    let con = document.querySelector("#pagination");
    document.querySelector("#pages").innerHTML=""
    // con.innerHTML=" ";
    // console.log(data)
    let arr=data.map((ele)=>{
        // console.log(ele)
        return`
        <div id='${ele.id}'>
        <img src='${ele.avatar}' alt="">
<<<<<<< HEAD
			<h3>First Name- ${ele.f_name}</h3>
			<h3>Last Name- ${ele.l_name}</h3>
			<h4>User Name- ${ele.username}</h4>
			<h4>Password- ${ele.password}</h4>
			<h4>Email- ${ele.email}</h4>
			<p>Redeem Offer- ${ele.Redeem_offer}</p>
			<p>Cart- ${ele.cart}</p>
			<p>Favourite Product- ${ele.fav_product}</p>
			<p>Order product- ${ele.ordered_product}</p>
=======
			<h3>${ele.f_name}</h3>
			<h3>${ele.l_name}</h3>
			<h4>${ele.username}</h4>
			<h4>${ele.password}</h4>
			<h4>${ele.email}</h4>
			<p>redeem:${ele.Redeem_offer}</p>
			<p>${ele.cart}</p>
			<p>${ele.fav_product}</p>
			<p>${ele.ordered_product}</p>
>>>>>>> 401bc27f908e19b9520fdf798ddf5690ab0c2969
            <button id="${ele.id}" class="delete">Delete</button>
            <button id="${ele.id}" class="edit">Give Offers</button>
		</div>
        `
    })
    con.innerHTML=arr.join("")

let deleteItem=document.querySelectorAll(".delete");
for(let i=0; i<deleteItem.length; i++){
    deleteItem[i].addEventListener("click",function(event){
        let deleteId=event.target.id;
        fun_delete(deleteId)
    })
}
let editbutton=document.querySelectorAll(".edit");
for(let i=0; i<editbutton.length; i++){
    editbutton[i].addEventListener("click",async function(e){
        let dataId = e.target.id;
        let data=await (await fetch(userurl+`/${dataId}`)).json(); 
        edit1.classList.add("active"); 
        console.log(data)
        let obj={...data}
        console.log(obj.Redeem_offer)
document.querySelector("#username").innerText=data.username;
let addbutton=document.querySelector('.edit1 form');
    addbutton.addEventListener("submit",async function(event){
        event.preventDefault();
    let offer=document.querySelector(".offer").value;
    console.log(offer)
    obj['Redeem_offer']=offer;
    console.log(obj);
    let res = await fetch(userurl+`/${dataId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(obj)
    })
    if(res.ok){
        user();
        alert("User is Updated");
    
        }else {
            alert("Something is wrong")
        }
        edit1.classList.remove("active");
        
        })
    })
}

}


async function fun_delete(deleteId){
    try {
        let res=await fetch(userurl + `/${deleteId}`,{
            method:"DELETE",
            headers:{"content-type":"application/json"}
        })
        if(res.ok){
            alert("product deleted")
            let data=await res.json()
            fetch(userurl)
            .then((resp)=>resp.json())
            .then((data)=>{
            user_data(data)
                // console.log(data)
            })
            
        }
    } catch (error) {
        alert(error)
    }
}

function renderdom(data) {
    let div = document.querySelector("#pagination");
    div.innerHTML = datahtml(data).join("")

    let deleteproduct = document.querySelectorAll('.delete');
    // console.log(deleteproduct);
    for (let i = 0; i < deleteproduct.length; i++) {
        deleteproduct[i].addEventListener('click', async function (e) {
            let dataId = e.target.id;
            console.log(dataId)
            let res = await fetch(procucturl + `/${dataId}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
            if(res.ok){
            alert("Product is deleted");
            fetch(procucturl + `?p=1&l=10`)
            .then(res => res.json())
            .then(data => renderdom(data));
            }else {
                alert("Something is wrong")
            }
        })
    }
    let editproduct = document.querySelectorAll('.edit');
    for (let i = 0; i < editproduct.length; i++) {
      editproduct[i].addEventListener('click', async function (e) {
            let dataId = e.target.id;
            let data=await (await fetch(procucturl+`/${dataId}`)).json(); 
            otp.classList.add("active"); 
    document.querySelector("#title").value=data.Title;
   document.querySelector("#des").value=data.description;
    document.querySelector("#price").value=data.price;
   document.querySelector("#offer").value=data.offer;
    document.querySelector("#image").value=data.image;

    let addbutton=document.querySelector('.otp form');
    addbutton.addEventListener("submit",async function(e){
        e.preventDefault()
    let title=document.querySelector("#title").value;
    let description=document.querySelector("#des").value;
    let price=document.querySelector("#price").value;
    let offer=+document.querySelector("#offer").value;
    let image=document.querySelector("#image").value;
    let obj= {
        "Title":`${title}`,
        "description":`${description}`,
        "image": `${image}`,
        "price": `${price}`,
        "offer": offer,
       }
       console.log(offer)
       let res = await fetch(procucturl+`/${dataId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(obj)
    })
    if(res.ok){
    alert("Product is Updated");
    fetch(procucturl + `?p=1&l=10`)
    .then(res => res.json())
    .then(data => renderdom(data));
    }else {
        alert("Something is wrong")
    }
    otp.classList.remove("active"); 

    })
        })
       
    }   
}

function datahtml(data) {
    let newdata = data.map(function (ele, index) {
        return `<div id="${ele.Product_id}">
        <img src="${ele.image}" alt="">
        <h3>${ele.Title}</h3>
        <p>${ele.description}</p>
        <h3>Price: ${ele.price}</h3>
        <h4>Offre: ${ele.offer}%</h4>
        <button class="edit" id=${ele.Product_id}>Edit</button>
        <button class="delete" id=${ele.Product_id}>Delete</button>
    </div>`
    });
    return newdata;



}


function add_product() {
    otp.classList.add("active"); // popup show otp
    document.querySelector("#title").value="";
    document.querySelector("#des").value="";
     document.querySelector("#price").value="";
    document.querySelector("#offer").value="";
     document.querySelector("#image").value="";
    let addbutton=document.querySelector('.otp form');
    addbutton.addEventListener("submit",async function(e){
        e.preventDefault()
    let title=document.querySelector("#title").value;
    let description=document.querySelector("#des").value;
    let price=document.querySelector("#price").value;
    let offer=+document.querySelector("#offer").value;
    let image=document.querySelector("#image").value;
    let obj= {
        "Title":`${title}`,
        "description":`${description}`,
        "image": `${image}`,
        "price": `${price}`,
        "offer": offer,
       }
       console.log(typeof(offer))
       let res = await fetch(procucturl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(obj)
    })
    if(res.ok){
    alert("Product is add");
    fetch(procucturl + `?p=1&l=10`)
    .then(res => res.json())
    .then(data => renderdom(data));
    }else {
        alert("Something is wrong")
    }
    otp.classList.remove("active"); 
    })
}
function close_button(){
    otp.classList.remove("active"); 
    edit1.classList.remove("active");
}