const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./route/userroute")
const {noteRoute}=require("./route/noteroute")
const {auth}=require("./middleware/authmiddleware")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use(auth)
app.use("/note",noteRoute)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to mongo")
    }catch(err){
        console.log(err)
    }
    console.log("server is working")
})