



let button=document.querySelector("form");
button.addEventListener("submit",((event)=>{
    event.preventDefault()

    let uname=document.getElementById("uname").value;
    let upassword=document.getElementById("upassword").value;
    
    if(uname==="admin" && upassword==="admin"){
        alert("login successful")
    }else{
        alert("error check you username & password")
    }
    
}))