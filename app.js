import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import connectDB from './src/database/database.js';
import newsRouter from './src/routes/newsRouter.js';
const app = express();
connectDB();


// Tạo __dirname tương tự CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// app.use(express.static(path.join(__dirname, 'public')));



app.use('/news', newsRouter);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
})