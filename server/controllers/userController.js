import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';
import {v2 as cloudinary} from 'cloudinary';

const getCurrentUser = async(req,res)=> {
    try {
        const {userId}=req.user;
        const currentUser=await User.findById(userId);
        if(!currentUser){
            return res.status(404).json({success:false,message:"User Not Found!"});
        }
        res.status(200).json({success:true, message: "User data fetched successfully.", user: currentUser})
            
    } catch (error) {
        res.status(500).json({success:false,message:error.message,hint:"getCurrentUser"})
    }
}


const updateCurrentUser = async(req,res)=> {
    
    try {
        const {userId}=req.user;
        const allowedUpdates = ['name', 'bio', 'profilePicture'];
        const updateData = {};
        allowedUpdates.forEach((field)=>{
            if(req.body[field] !==undefined){
                updateData[field]=req.body[field]
            }
        })
        const currentUser=await User.findByIdAndUpdate(userId,{$set:updateData},{new:true}).select("-password");
        
        if(!currentUser){
            return res.status(404).json({success:false,message:"User Not Found!"});
        }
     
        res.status(200).json({success:true, message: "User profile updated successfully.", user: currentUser})
            
    } catch (error) {
        res.status(500).json({success:false,message:error.message, hint: "updateCurrentUser"})
    }
}

      



const deleteCurrentUser =async(req,res)=> {
    try {
        const {userId}=req.user;
        const deletedUser=await User.findByIdAndDelete(userId).select("-password");
        
        if(!deletedUser){
            return res.status(404).json({success:false,message:"User Not Found!"});
        }
     
        res.status(200).json({success:true, message: "User deleted successfully.", user: deleteCurrentUser})
    } catch (error) {
        res.status(500).json({success:false,message:error.message, hint: "deleteCurrentUser"})
    }
}



export {getCurrentUser,updateCurrentUser,deleteCurrentUser}





