let procucturl="https://639883a4fe03352a94d3d897.mockapi.io/product/kpc";
let userurl="https://639883a4fe03352a94d3d897.mockapi.io/product/kpc_user";
let count=0;
async function product(){
    try {
        let res =await fetch(procucturl);
        let data =await res.json();
        // console.log(res)
        pagination_button(data.length)
    } catch (error) {
        console.log(error)
    }
}
function pagination_button(count){
    fetch(procucturl+`?p=1&l=10`)
      .then(res=>res.json())
      .then(data=>renderdom(data));
    let totalNumberOfButtons = Math.ceil(count/ 10);
    console.log(count)
    function asListOfButtons() {
        let arr = [];
        for (let i = 1; i<=totalNumberOfButtons; i++) {
          arr.push(`<button class="pagination" id = ${i} > ${i} </button>`);
        }
        console.log(arr)
        return arr.join('');
}
// console.log(asListOfButtons())
let pages=document.querySelector("#pages");
pages.innerHTML=asListOfButtons();


let paginationButtons = document.querySelectorAll('.pagination');
// console.log(typeof(paginationButtons),"1234")
  for (let paginationButton of paginationButtons) {
    paginationButton.addEventListener('click', function(e){
      let dataId = e.target.id;
      console.log(dataId)
      fetch(procucturl+`?p=${dataId}&l=10`)
      .then(res=>res.json())
      .then(data=>renderdom(data));
    })

}
let deleteproduct = document.querySelectorAll('.delete');
console.log(deleteproduct);
for (let i=0;i<deleteproduct.length;i++) {   
deleteproduct[i].addEventListener('click',async function(e){
  let dataId = e.target.id;
  console.log(dataId)
 let res= await fetch(procucturl+`/:${dataId}`,{
    method: "DELETE",
    headers:"content_type:aplication/json"
  })
 console.log(res);
})
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
        <h3>Price: ${ele.price}</h3>
        <h4>Offre: ${ele.offer}%</h4>
        <button class="edit" id=${ele.Product_id}>Edit</button>
        <button class="delete" id=${ele.Product_id}>Delete</button>
    </div>`
    });
    return newdata;
    
   

}


function add_product(){
    
}