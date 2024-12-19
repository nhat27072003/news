import { Router } from 'express';
import NewsController from '../controllers/NewsController.js';

const newsRouter = Router();

const newsController = new NewsController();

newsRouter.get('/search', newsController.searchNews);
newsRouter.get('/:id', newsController.getNewsDetails);
export default newsRouter;
