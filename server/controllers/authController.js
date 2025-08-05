import jwt from 'jsonwebtoken';
import User from '../models/userModels.js'
import bcrypt from 'bcrypt';
import transporter from '../config/nodemailer.js';
import { Registration_Template, passwordResetEmail, accountVerifyEmail, Password_Changed_Template, Email_Verification_Template } from '../config/emailTemplate.js';

const tokenGenerater = async (id) => {
    console.log("tokenGenerater", process.env.JWT_ACCESS_TOKEN)
    let token = jwt.sign({ userId: id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '7d' })
    console.log("tokenGenerater token", token)
    return token
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide complete information", success: false });
    }
    try {
        const allUser = await User.find({});
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists!", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let newUser = new User({ name, password: hashedPassword, email });
        newUser = await newUser.save();

        const token = await tokenGenerater(newUser._id);


        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const htmlContent = Registration_Template
            .replaceAll('{{name}}', newUser.name)
            .replaceAll('{{email}}', newUser.email)

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: '🎉 Welcome to Learner_hub Platform — Let’s Unlock Your Potential!',
            html: htmlContent
        }

        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Registered successfully!", });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "register" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "please provide complete information", success: false })
    }
    try {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(404).json({ message: "User not found!", success: false })
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            return res.status(400).json({ message: "invalid Password!", success: false })
        }
        const token = await tokenGenerater(existUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })


        return res.json({ success: true, message: 'loggedIn succesfully!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "login" });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: 'Logged Out' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "logout" });
    }
}

//send verification otp to user email
const sendVerificationEmailOtp = async (req, res) => {
    try {
        const { userId } = req.user;
        const existUser = await User.findById(userId);
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }
        if (existUser.isAccountVerified) {
            return res.json({ success: false, message: 'account already verified!' })
        }
        const otp = String(Math.floor(100000 + (Math.random() * 900000)));
        existUser.verifyOtp = otp;
        existUser.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await existUser.save();

        const httpContent = Email_Verification_Template
            .replaceAll('{{name}}', existUser.name)
            .replaceAll('{{otp}}', existUser.verifyOtp)

        const mailOptions = {
            to: existUser.email,
            from: process.env.SENDER_EMAIL,
            subject: 'Confirm Your Email for Team Learning_hub',
            html: httpContent
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: true, message: '✅ Verification email sent successfully. Please check your inbox.' })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "sendVerificationEmailOtp" });
    }
}


const verifyEmail = async (req, res) => {
    try {
        const { userId } = req.user;
        const { otp } = req.body;
        const existUser = await User.findById(userId);
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }
        if (existUser.verifyOtp === "" || existUser.verifyOtp !== otp) {
            return res.json({ success: false, message: 'invalid OTP!' })
        }
        if (existUser.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired!' })
        }

        existUser.isAccountVerified = true;
        existUser.verifyOtpExpireAt = 0;
        existUser.verifyOtp = ""

        await existUser.save();
        return res.json({ success: true, message: '✅ Email verified successfully. You can now access your account.' });


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "verifyEmail" });
    }
}

//check if user is authenticated
const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "isAuthenticated" })
    }
}

const sendResetOtp = async (req, res) => {
    try {
        const { userId } = req.user;
        const existUser = await User.findById(userId);
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }
        if (!existUser.isAccountVerified) {
            return res.json({ success: false, message: 'Email verification is required to proceed.' })
        }
        const resestOtp = String(Math.floor(100000 + (Math.random() * 900000)));
        existUser.resetOtp = resestOtp;
        existUser.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000;
        await existUser.save();

        const httpContent = passwordResetEmail
            .replaceAll('{{name}}', existUser.name)
            .replaceAll('{{otp}}', existUser.resetOtp)

        const mailOptions = {
            to: existUser.email,
            from: process.env.SENDER_EMAIL,
            subject: 'Your OTP for Password Reset — Team Learning_hub',
            html: httpContent
        }
        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: '✅ Password reset OTP sent successfully. Please check your email.',
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "sendResetOtp" })
    }
}


const resetPassword = async (req, res) => {
    try {
        const { resetOtp, newPassword } = req.body;
        const { userId } = req.user;
        const existUser = await User.findById(userId);
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }
        if (existUser.resetOtp === "" || existUser.resetOtp !== resetOtp) {
            return res.json({ success: false, message: 'invalid OTP!' })
        }
        if (existUser.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired!' })
        }
        const newHashPassword = await bcrypt.hash(newPassword, 10);

        existUser.password = newHashPassword;
        existUser.resetOtpExpireAt = 0;
        existUser.resetOtp = ""
        await existUser.save();
        const PasswordChangedTemplate = Password_Changed_Template
            .replaceAll('{{name}}', existUser.name)
            .replaceAll('{{email}}', existUser.email);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: existUser.email,
            subject: '🔒 Your Password Has Been Changed — Team Learning_hub',
            html: PasswordChangedTemplate
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: '✅ Password has been reset successfully. You can now log in with your new password.' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, hint: "resetPassword" })
    }
}

export { register, login, logout, sendVerificationEmailOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword }




