const express=require("express")

const noteRoute=express.Router()
const {NoteModel}=require("../model/notemodel")
const jwt=require("jsonwebtoken")
//get
noteRoute.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            const note=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(note)
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

noteRoute.post("/add",async(req,res)=>{
    const payload=req.body
    try{
        const note=new NoteModel(payload)
        await note.save()
        res.status(200).send({"msg":"note created"})

    }catch(err){
        res.send("something went wrong")
        console.log(err)
    }

})
//patch
noteRoute.patch("/update/:userid",async(req,res)=>{
    const userid=req.params.userid
    const payload=req.body
    try{
        const query=await NoteModel.findByIdAndUpdate({_id:userid},payload)
        res.status(200).send({"msg":"note update"})

    }catch(err){
        res.status(400).send("error")
    }
})
//delete
noteRoute.delete("/delete/:userid",async(req,res)=>{
    const userid=req.params.userid
   
    try{
        const query=await NoteModel.findByIdAndDelete({_id:userid})
        res.status(200).send({"msg":"note delete"})

    }catch(err){
        res.status(400).send("error")
    }
})




module.exports={
    noteRoute
}