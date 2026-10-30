const btn=document.querySelector("#trans")
const add=document.querySelector(".recipient-list")


////delete bin button adding
const deletefunction=()=>{
    const bin=document.querySelectorAll(".delete")
    for(let btn of bin){
    btn.addEventListener("click",async()=>{
        const task=btn.parentElement
        const amount=Number(task.querySelector(".amount").textContent)
         const type=task.querySelector(".status").textContent
        if (type === "given") {
                totalamount = totalamount - amount
                addingup.innerText = `₹${totalamount}`
            }
            else {
                borrowed = borrowed - amount
                addingdown.innerText = `₹${borrowed}`
            }
            totalbalance = totalamount - borrowed
            totalbal.innerText = `₹${totalbalance}`
            if (totalbalance < 0) {
                colorchange.style.backgroundColor = "#FFE8E8"
            }
            else if (totalbalance === 0) {
                colorchange.style.backgroundColor = "white"
            }
            else {
                colorchange.style.backgroundColor = "#E8F8EF"
            }
        task.remove()
    })
}}


///adding up the value in the given
const addingup=document.getElementById("Lend")
const addingdown=document.getElementById("borrowed")
const totalbal=document.getElementById("totalbal")
const colorchange=document.querySelector(".circle-inner")
let totalamount=0
let borrowed=0
let totalbalance=0

btn.addEventListener("click",async()=>{
    const amount=document.getElementById("amount").value
    const username=document.getElementById("name").value
    const type=document.getElementById("type").value
    add.innerHTML+=
    `
                   <div class="recipient">
    <span class="recipient-name">${username}</span>
    <strong class="amount green">${amount}</strong>
    <span class="status received-label">${type}</span>
    <button class="delete">🗑️</button>
</div>
    `

    ///sending the req body
    const response=await fetch("https://kathabook-5.onrender.com/kathabook",{
        method:"POST",
         headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        amount:amount,
        username:username,
        type:type
    })
    })

    if(type=="given"){
    totalamount=totalamount+Number(amount)
    console.log(totalamount)
    addingup.innerText=
    `
    ₹${totalamount}
    `
    }
    else{
         borrowed=borrowed+Number(amount)
    console.log(totalamount)
    addingdown.innerText=
    `
    ₹${borrowed}
    ` 
    }
    totalbalance=totalamount-borrowed
    totalbal.innerText=
    `
    ₹${totalbalance}
    `
    if(totalbalance<0){
        colorchange.style.backgroundColor="#FFE8E8"
    }
    else if(totalbalance==0){
        colorchange.style.backgroundColor="white"
    }
    else{
        colorchange.style.backgroundColor="#E8F8EF"
    }
     deletefunction()

})


////search bar
const search=document.getElementById("search")
const list=document.querySelector(".recipient-list")

search.addEventListener("input",()=>{
    const value=search.value.toLowerCase()
    const transations=list.children
    for(let tran of transations){
    const name=tran.querySelector(".recipient-name").textContent.toLowerCase()
        if(name.includes(value)){
            tran.style.display=""
        }
        else{
            tran.style.display="none"
        }
    }
})

