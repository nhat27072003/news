import { Router } from 'express';
import NewsController from '../controllers/NewsController.js';

const newsRouter = Router();

const newsController = new NewsController();

newsRouter.get('/', newsController.getTop20News)
newsRouter.get('/:id', newsController.getNewsDetails);
newsRouter.post('/add', newsController.createNews);
newsRouter.delete('/:id', newsController.deleteNews);

export default newsRouter;
