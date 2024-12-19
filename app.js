import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import connectDB from './src/database/database.js';
import newsRouter from './src/routes/newsRouter.js';
import commentRouter from './src/routes/commentRoute.js';
import userRouter from './src/routes/userRouter.js';
import htmlRouter from './src/routes/htmlRouter.js';
import ejsLayouts from 'express-ejs-layouts';
import adminRouter from './src/routes/adminRouter.js';
import cookieParser from 'cookie-parser';
import { checkLogin } from './src/middlewares/athenication.js';


const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(checkLogin)
app.use('/admin', adminRouter);
app.use(ejsLayouts);
app.use('/news', newsRouter);
app.use('/comment', commentRouter);
app.use('', userRouter);
app.use('', htmlRouter);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
})