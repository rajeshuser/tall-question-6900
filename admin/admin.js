



let button=document.querySelector("form");
button.addEventListener("submit",((event)=>{
    event.preventDefault()

    let uname=document.getElementById("uname").value;
    let upassword=document.getElementById("upassword").value;
    if(upassword!="admin"){
        let p=document.querySelector("#wrong");
        p.innerText="Please enter your valid password"
    }
    
    else if(uname==="admin" && upassword==="admin"){
        alert("login successful")
        window.location.href="dashboard.html"
    }else{
        alert("error check you username & password")
    }
    
}))