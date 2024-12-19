import { Router } from "express";
import AdminController from "../controllers/AdminController.js";
import NewsController from "../controllers/NewsController.js";
import upload from '../middlewares/multer.js'
import { adminAuthentication, authenticateToken } from "../middlewares/athenication.js";

const adminRouter = Router();
const adminController = new AdminController();
const newsController = new NewsController();


adminRouter.get('/news', authenticateToken, adminAuthentication, adminController.getManagePage);
adminRouter.get('/user/add', authenticateToken, adminAuthentication, adminController.getAddUserPage);
adminRouter.post('/user/add', authenticateToken, adminAuthentication, adminController.addUser);
adminRouter.get('/user/edit/:id', authenticateToken, adminAuthentication, adminController.getEditUserPage);
adminRouter.post('/user/edit/:id', authenticateToken, adminAuthentication, adminController.editUser);
adminRouter.post('/user/delete/:id', authenticateToken, adminAuthentication, adminController.deleteUser);
adminRouter.get('/user', authenticateToken, adminAuthentication, adminController.getManageUser);
adminRouter.get('/news/add', authenticateToken, adminAuthentication, adminController.getAddNewsPage);
adminRouter.get('/news/edit/:id', authenticateToken, adminAuthentication, newsController.getEditNews);
adminRouter.post('/news/edit/:id', authenticateToken, adminAuthentication, upload.single('image'), newsController.editNews);
adminRouter.post('/news/add', authenticateToken, adminAuthentication, upload.single('image'), newsController.createNews);
adminRouter.get('/news/delete/:id', authenticateToken, adminAuthentication, newsController.deleteNews);
export default adminRouter;