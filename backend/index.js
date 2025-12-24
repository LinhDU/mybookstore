import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import { PORT, mongoDBUrl } from './config.js';
import { Book } from './models/bookModel.js';

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());
app.use(cors());

// public/images để truy cập ảnh
app.use('/images', express.static('public/images'));

/* ---------- MULTER: UPLOAD ẢNH LOCAL ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // nhớ tạo thư mục này
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

/* ---------- ROUTES ---------- */

// 1. Thêm sách + upload ảnh
app.post('/books', upload.single('image'), async (req, res) => {
  try {
    const {
      title, author, price, category, pages,
      publisher, issuedBy, pubDate, size,
      coverType, description, longDescription
    } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({
        message: 'Thiếu các trường bắt buộc: title, author, price'
      });
    }

    const newBook = {
      title,
      author,
      price,
      category,
      pages,
      publisher,
      issuedBy,
      pubDate,
      size,
      coverType,
      description,
      longDescription,
      image: req.file ? req.file.filename : ''
    };

    const book = await Book.create(newBook);
    return res.status(201).json(book);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// 2. Lấy danh sách sách
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Lấy chi tiết 1 sách
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------- CONNECT DB & START SERVER ---------- */
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`)
    );
  })
  .catch((err) => console.log('Lỗi kết nối DB:', err));
