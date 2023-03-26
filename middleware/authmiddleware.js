const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token= req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.send("please login")
        }
    }else{
        res.send("please login")
    }
}


module.exports={
    auth
}