import User from '../models/userModels.js';
const listAllUsers= async(req,res) => {
    try {
        const allUsers=await User.find({});
        if(!allUsers){
            return res.status(404).json({success:false,message:"Users Not Found!"});
        }
        res.status(200).json({success:true, message: "Users data fetched successfully.", allUsers: allUsers})
    } catch (error) {
        res.status(500).json({success:false,message:error.message,hint:"listAllUsers"})
    }

}

const removeUser= async(req,res) => {
    try {
        const {userId}=req.body;
        const deletedUsers=await User.findByIdAndDelete(userId).select('-password');
        if(!deletedUsers){
            return res.status(404).json({success:false,message:"Users Not Found!"});
        }
        res.status(200).json({success:true, message: "Users data fetched successfully.", deletedUsers})
    } catch (error) {
        res.status(500).json({success:false,message:error.message,hint:"removeUser"})
    }

}