const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")

const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()

////middleware
function verifytoken(req, res, next) {

    const token = req.headers.authorization

    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {

        if (err) {
            return res.send("Invalid token")
        }

        req.user = decoded
        next()
    })
}


///mongo db connection
mongoose.connect(process.env.MONGODB_URL,
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

app.get("/", (req, res) => {
    res.send("KathaBook backend is running")
})

////server code
app.get("/kathabook", verifytoken, async(req,res)=>{
    const task = await model.find({
        userId: req.user.id
    })

    res.send(task)
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server is running")
})

///database schema

const schema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signupmodel",
        required: true
    },
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

app.post("/kathabook",verifytoken,async(req,res)=>{

    const task=await model.create({
        userId:req.user.id,
        username:req.body.username,
        amount:req.body.amount,
        type:req.body.type
    })

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
        return res.send({message: "no user found"})
    }

    const ismatch=await bcrypt.compare(password,newuser.password)
    if(!ismatch){
        return res.send({
            message:"password incorrect"})
    }
    const token=jwt.sign(
        {
            id:newuser._id
        },
        process.env.SECRETKEY
    )
    res.send({
        token}
    )
})

app.delete("/kathabook/:id", verifytoken, async(req,res)=>{

    await model.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
    })

    res.send("deleted")
})