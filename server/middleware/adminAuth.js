import jwt from 'jsonwebtoken';
const adminAuth =async(req,res,next)=>{
    const atoken=req.headers.atoken || req.cookies.atoken;
    try {
        if(!atoken){
            return res.json({success:false,message:"Atoken is missing"})
        }
        const decoded=jwt.verify(atoken,process.env.JWT_ACCESS_TOKEN);
        if(decoded.role!=='admin'){
            return res.status(401).json({ success: false, message: "Invalid admin credentials." });
    
        }
        next()
        
    } catch (error) {
        return res.status(401).json({ success: false, message:error.message });
    }
}

export default adminAuth;