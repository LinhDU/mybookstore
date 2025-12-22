import mongoose from 'mongoose'; // THÊM DÒNG NÀY ĐẦU FILE
import express from 'express';
import cors from 'cors';
import { PORT, mongoDBUrl } from './config.js';

const app = express();

// ... các phần code khác của bạn ...

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });