const btn=document.querySelector("#btn")
btn.addEventListener("click",async()=>{
    const name=document.getElementById("username").value
    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    const retype=document.getElementById("confirm-password").value
    if(retype!=password){
        alert("password was not matched")
    }
   else{
    const respose=await fetch("https://kathabook-epyw.onrender.com/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password
        })
    })
    window.location.href = "../login/login.html"
}
})