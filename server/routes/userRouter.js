import express from 'express';
const userRouter=express.Router();
import Auth from '../middleware/Auth.js'
import {getCurrentUser,updateCurrentUser,deleteCurrentUser} from '../controllers/userController.js'

userRouter.get("/get-current-user",Auth,getCurrentUser);
userRouter.patch("/update-current-user",Auth,updateCurrentUser);
userRouter.delete("/delete-current-user",Auth,deleteCurrentUser);

export default userRouter;