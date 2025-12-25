import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBUrl } from './config.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Rất quan trọng để Vite gọi được API

// Phục vụ ảnh để Frontend có thể truy cập qua URL: http://localhost:5555/images/ten-anh.jpg
app.use('/images', express.static('public/images'));

// Điều hướng các request bắt đầu bằng /books sang file route
app.use('/books', booksRoute);

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