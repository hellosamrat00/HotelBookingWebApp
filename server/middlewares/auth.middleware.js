import { User } from "../models/user.model.js";

export const protect = async(req,res,next)=>{
    const {userId}=req.auth
    if(!userId){
        res.json({success:false, message:"Not authorized"})
    }
    else{
        const user = await User.findById(userId)
        req.user = user
        next()
    }
}