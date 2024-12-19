import { Router } from "express";
import HomeController from "../controllers/HomeController.js";

const htmlRouter = Router();
const homeController = new HomeController();

htmlRouter.get('', homeController.getHomePage);
htmlRouter.get('/login', homeController.getLoginPage);
htmlRouter.get('/signup', homeController.getSignupPage);
htmlRouter.get('/:category', homeController.getCategoryPage)
export default htmlRouter;