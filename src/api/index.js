require('./db')
const express = require("express")
const encrypt = require("bcryptjs")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const jwt = require("jsonwebtoken")
const cookie = require("cookie")



// Type if Admin : True and not Admin : False
const RegSchema= new mongoose.Schema({
    Email:String,
    FullName:String,
    Password:String,
    Type:Boolean
})

const InvSchema = new mongoose.Schema({
    Name:String,
    Brand:String,
    Price:String,
    Img:String
})

const CartSchema = new mongoose.Schema({
    Name:String,
    User:String,
    Price:String,
    Brand:String,
    Img:String,
    Quantity:String
})

const RegDb = new mongoose.model("RegUnix",RegSchema)
const InvDb = new mongoose.model("InvDb",InvSchema)
const CartDb = new mongoose.model("Cartvdb",CartSchema)

app.post('/Register',async(req,res)=>{
    const Pass = encrypt.hashSync(req.body.Password,10)
    const Data = new RegDb({
        Email:req.body.Email,
        FullName:req.body.FullName,
        Password:Pass,
        Type:req.body.Type
    })
    const Token = await jwt.sign({FullName:req.body.FullName,Email:req.body.Email},"myNameIsPrashant")
    res.setHeader("Set-Cookie",cookie.serialize("jwt",String(Token),{
        httpOnly:true
    }))
    const Result = await Data.save() 
    res.status(200).send({status:true})
})

app.post("/AddInv",async(req,res)=>{
    console.log(req.body)
    const Data = new InvDb({
        Name:req.body.Name,
        Brand:req.body.Brand,
        Price:req.body.Price,
        Img:req.body.Img
    })

    const Result = await Data.save()
    res.status(200).send({status:true})
})

app.post("/AddCart",async(req,res)=>{
    const Data = new CartDb({
        Name : req.body.Name,
        User: req.body.User,
        Price:req.body.Price,
        Brand:req.body.Brand,
        Img:req.body.Img,
        Quantity:req.body.Quantity
    })
    const Result = await Data.save() 
    res.status(200).send({status:true})
})

app.post("/Inv",async(req,res)=>{
    const Data = await InvDb.find({})
    res.status(200).send({status:true,Arr:Data})
})

app.post("/CheckUser",async(req,res)=>{
    const Data = await RegDb.find({Email:req.body.Email})
    console.log(Data.length)
    if (Data.length == 0){
        res.status(200).send({status:true})
    }
    if (Data.length != 0){
        res.status(200).send({status:false})
    }
})

app.post("/Token",async(req,res)=>{
    const Token = req.headers.cookie
    if (Token == undefined){
        res.status(200).send({status:false})
    }
    if (Token != undefined){
        const Cookies = cookie.parse(Token)
        const data = jwt.verify(Cookies.jwt,"myNameIsPrashant")
        const Data = await RegDb.find({Email:data.Email})
        if (Data.length != 0){
            res.status(200).send({status:true,Email:Data[0].Email,FullName:Data[0].FullName,Type:Data[0].Type})
        }
        if (Data.length == 0){
            res.status(200).send({status:false})
        }
    }
})

app.post("/Edit",async(req,res)=>{
    const Data = await InvDb.updateOne({_id:req.body. id},{$set:{Name:req.body.Name,Price:req.body.Price,Brand:req.body.Brand,Img:req.body.Img}})
    console.log(Data)
    res.status(200).send({status:true})
})

app.post("/Login",async(req,res)=>{
    const Data = await RegDb.find({Email:req.body.Email})
    console.log(req.body)
    if (Data.length != 0){
        console.log(Data[0].Password,req.body.Password)
        const PassCheck = await encrypt.compare(req.body.Password,Data[0].Password)
        if (PassCheck == true){
            const FullName = Data[0].FullName
            const Token = await jwt.sign({FullName:FullName,Email:req.body.Email},"myNameIsPrashant")
            res.setHeader("Set-Cookie",cookie.serialize("jwt",String(Token),{
        httpOnly:true
    }))
    res.status(200).send({status:true})

    
    if (PassCheck == false){
        res.status(200).send({status:false})
    }

    }
    
}
if (Data.length == 0){
    res.status(200).send({status:false})
}

})
app.listen(8000,()=>{
    console.log("i am working")
})