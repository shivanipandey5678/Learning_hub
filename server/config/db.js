import mongoose from 'mongoose';

const connectDb =async(req,res,next) => {
    try {
        mongoose.connection.on('connected',()=>{
            console.log("dataBase is connected!")
        })
        await mongoose.connect(`${process.env.MONGO_URL}/learning_hub`);
       
        
       
    } catch (error) {
        console.log(error)
    }
}
export {connectDb} 