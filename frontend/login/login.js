const btn=document.getElementById("button")

btn.addEventListener("click",async()=>{
    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    const response=await fetch("http://localhost:3005/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })

    })
    const data=await response.json()
    if(data.token){
        localStorage.setItem("token",data.token)
        window.location.href = "../dashboard/index.html"
        console.log("successfully stored") 
    }
})