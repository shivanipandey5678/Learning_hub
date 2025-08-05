import jwt from 'jsonwebtoken';
import User from '../models/userModels.js'

const Auth = async(req,res,next)=>{
    const token=req.headers.token || req.cookies.token;
  
    if(!token){
        return res.json({message:'Missing token,Login again',success:false})

     }
   
    try {
       
        let decoded=await jwt.verify(token,process.env.JWT_ACCESS_TOKEN);
      
        if(!decoded){
            return res.json({success:false,message:"issue in decoded",decoded})
        }
     
        if(decoded.userId){
          
           req.user= { userId:decoded.userId};   
           next()
         
        }else{
            return res.json({success:false,message:'Not Authorized,Login again',hint:"AuthElse"});
          
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message, hint: "Auth" })

   
    }
}

export default Auth;