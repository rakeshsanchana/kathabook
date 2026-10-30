const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")

const app=express()
app.use(express.json())
app.use(cors())

app.get("/kathabook",(req,res)=>{
    res.send("created")
})

///mongo db connection
mongoose.connect("mongodb://rakeshsanchana0411_db_user:d4oIOnopxO2fxjZS@ac-uod9lfp-shard-00-00.iwm2hrl.mongodb.net:27017,ac-uod9lfp-shard-00-01.iwm2hrl.mongodb.net:27017,ac-uod9lfp-shard-00-02.iwm2hrl.mongodb.net:27017/?ssl=true&replicaSet=atlas-5vkt8r-shard-0&authSource=admin",
    {
        dbName:"kathabook"
    }
)
.then(()=>{
    console.log("server is connected")
})
.catch((err)=>{
    console.log("there is a error")
})


////server code
app.get("/", (req, res) => {
    res.send("KathaBook backend is running successfully!")
})

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log("server is running")
})

///database schema

const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

///database model

const model=mongoose.model("model",schema) 

app.post("/kathabook",async(req,res)=>{
    const task=await model.create(req.body)
    res.send(task)
})



////signup

const signup=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const signupmodel=mongoose.model("signupmodel",signup)

app.post("/signup",async(req,res)=>{
    const hashpass=await bcrypt.hash(req.body.password,10)
    const user=await signupmodel.create({
        "name":req.body.name,
        "email":req.body.email,
        "password":hashpass
})
    res.send(user)
})

////login page

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const newuser=await signupmodel.findOne({email})
    if(!newuser){
        return res.send("no user found")
    }

    const ismatch=await bcrypt.compare(newuser.password,password)
    if(!ismatch){
        return res.send("password incorrect")
    }
    res.send("login successful")
})