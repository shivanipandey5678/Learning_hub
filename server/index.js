import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app=express();
const port = process.env.PORT ;
import cors from 'cors';
import {connectDb} from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js'



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));


//connection 
connectDb()
connectCloudinary()


app.get("/health-check",(req,res)=>{
    console.log("SMTP_USER loaded:", process.env.SMTP_USER,"index.js");

    res.send("server's health is perfect")
});

//endPoints
app.use('/api/auth',authRouter);
app.use('/api',userRouter);

app.listen(port,()=>{
    console.log(`💡 Server is live at http://localhost:${port}`);
})