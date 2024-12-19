import { Router } from "express";
import CommentController from "../controllers/CommentController.js";
import { authenticateToken } from "../middlewares/athenication.js";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.post('/add', authenticateToken, commentController.createComment);


export default commentRouter;