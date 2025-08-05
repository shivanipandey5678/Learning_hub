import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port:587,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
});


transporter.verify((error,verify)=>{
    if(error){
        console.error('❌ Email transporter error:', error);
    }else{
        console.log('✅ Email transporter is ready!');
    }
});

export default transporter;