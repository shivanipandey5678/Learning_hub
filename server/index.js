import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {connectDb} from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import authRouter from './routes/authRouter.js';
// Add this after your auth routes
import courseRouter from './routes/courseRouter.js';
const app=express();
const port = process.env.PORT ;

app.use('/api/v1', courseRouter);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173', // Replace with Postman's origin if needed
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
app.use('/api/auth',authRouter)

app.listen(port,()=>{
    console.log(`💡 Server is live at http://localhost:${port}`);
})