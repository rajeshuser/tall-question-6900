let procucturl="https://639883a4fe03352a94d3d897.mockapi.io/product/kpc";
let userurl="https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user";
async function product(){
    try {
        let res=await fetch(procucturl);
        let data=await res.json();
        renderdom(data)
    } catch (error) {
        console.log(error)
    }
}
async function user(){
    try {
        let res=await fetch(userurl);
        let data=await res.json();
        // renderdom(data)
        console.log(data)
    } catch (error) {
        console(error)
    }
}
function renderdom(data){
    let div=document.querySelector("#pagination");
    div.innerHTML=datahtml(data).join("")
}
function datahtml(data){
    let newdata=data.map(function(ele,index){
        return `<div id="${ele.Product_id}">
        <img src="${ele.image}" alt="">
        <h3>${ele.Title}</h3>
        <p>${ele.description}</p>
        <h3>${ele.price}</h3>
        <h4>${ele.offer}</h4>
        <button>Edit</button>
        <button>Delete</button>
    </div>`
    });
    return newdata
    
}
