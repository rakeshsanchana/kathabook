const btn=document.getElementById("button")

btn.addEventListener("click",async()=>{
    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    const response=await fetch("https://kathabook-kvn3.onrender.com/login",{
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
        const data = await response.json()
        console.log(data)
        console.log("successfully stored") 
    }
})