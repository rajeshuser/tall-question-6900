let url ="https://639883a4fe03352a94d3d897.mockapi.io/product/kpc"
let items = []
fetch(url)
    .then((res) => res.json())
    .then((data) => {
        items = data
        displaycard(data)
    })

    function search(){
        let ser=document.querySelector("#products>input").value
        let newdata=bag.filter(function(el){
            return el.Title.toLowerCase().includes(ser.toLowerCase())
        })
        displaycard(newdata)
    }
function displaycard(arr) {
    document.querySelector(".menu").innerHTML = ""
    arr.forEach((element) => {
        let div = document.createElement("div")
        let div2=document.createElement("div")
        let Div=document.createElement("div")
        let Img = document.createElement("img")
        Img.setAttribute("src", element.image)
        let title = document.createElement("h3")
        title.innerText = element.Title
        let desc = document.createElement("p")
        desc.innerText = element.description
        let cat = document.createElement("p")
        cat.innerText = element.category
        let Price = document.createElement("h3")
        Price.innerText = element.price
        let btn = document.createElement("button")
        btn.innerText = "Add to Cart+"
        btn.addEventListener("click",()=>{
            addData("cart",element.Product_id)
        })

        div.append(Img)
        div2.append(title, Price,desc, btn)
        Div.append(div,div2)
        document.querySelector('.menu').append(Div)
      
    });
}
function addData(key,value){
   let Data=JSON.parse(localStorage.getItem(key))||[]
   Data.push(value)
   localStorage.setItem(key,JSON.stringify(Data))
 }
