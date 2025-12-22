import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import { PORT, mongoDBUrl } from './config.js';
import { Book } from './models/bookModel.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));

// Cấu hình lưu trữ ảnh local
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// ROUTE POST: Thêm đầy đủ các trường thông tin
app.post('/books', upload.single('image'), async (req, res) => {
  try {
    const { 
      title, author, price, category, pages, 
      publisher, issuedBy, pubDate, size, 
      coverType, description, longDescription 
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!title || !author || !price) {
      return res.status(400).send({ message: 'Thiếu các trường bắt buộc: title, author, price' });
    }

    const newBook = {
      title,
      author,
      price,
      image: req.file ? req.file.filename : '', // Lưu tên file ảnh từ local
      category,
      pages,
      publisher,
      issuedBy,
      pubDate, // Định dạng YYYY-MM-DD
      size,
      coverType,
      description,
      longDescription
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Các Route GET khác giữ nguyên...
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

mongoose.connect(mongoDBUrl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((err) => console.log(err));