import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBUrl } from './config.js';
import booksRoute from './routes/booksRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/images', express.static('public/images'));
app.use('/books', booksRoute);

// Đăng ký route auth
app.use('/api/auth', authRoute);

// Kết nối MongoDB và chạy Server
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('Đã kết nối tới MongoDB Atlas thành công!');
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Lỗi kết nối DB:', error);
  });
