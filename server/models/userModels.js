import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: '' },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },
    enrolledCourses:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}],
    completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

});
const User = mongoose.model('User', userSchema)
export default User;