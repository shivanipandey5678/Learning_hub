import  { register, login, logout, sendVerificationEmailOtp, verifyEmail, isAuthenticated ,sendResetOtp ,resetPassword} from '../controllers/authController.js';
import express from'express';
import Auth from '../middleware/Auth.js'
const authRouter = express.Router();


// Public Routes
authRouter.post('/register', register);
authRouter.post('/login', login);

// Protected Routes (require token)
authRouter.post('/logout', Auth, logout);
authRouter.post('/verification-otp', Auth,sendVerificationEmailOtp);
authRouter.post('/verify-email', Auth, verifyEmail);
authRouter.post('/is-authenticated', Auth, isAuthenticated);
authRouter.post('/reset-otp', Auth, sendResetOtp);
authRouter.post('/reset-password', Auth, resetPassword);

export default authRouter;