import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { adminAuthentication, authenticateToken } from "../middlewares/athenication.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.post('/signup', userController.signupAccount);
userRouter.post('/user', authenticateToken, adminAuthentication, userController.deleteUser);
userRouter.get('/user', authenticateToken, adminAuthentication, userController.getAllUser);

export default userRouter;