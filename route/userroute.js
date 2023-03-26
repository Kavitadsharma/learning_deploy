const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

//while register
userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user=new UserModel({name,email,pass:hash,age})
            await user.save()
            res.send("registered")
        })
    }catch(err){
        res.send("error in registering the user")
    }
})


//while login
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email})
            if(user){
                bcrypt.compare(pass,user.pass,function(err,result){
                    if(result){
                        res.status(200).send({"msg":"login successfull","token":jwt.sign({"userID":user._id},"masai")})
                    }else{
                        res.send("wrong credentials")
                    }
                })
            }
    }catch(err){
        res.send("something went wrong")
        console.log(err)
    }
})


module.exports={
    userRouter
}