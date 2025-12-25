import express from 'express';
import { Book } from '../models/bookModel.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Cấu hình lưu trữ ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Bạn cần tạo thư mục này thủ công ở Backend
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 1. Lấy tất cả sách (GET http://localhost:5555/books)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 2. Lấy 1 cuốn sách theo ID (GET http://localhost:5555/books/:id)
// backend/routes/booksRoute.js
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        // Trả về object có thuộc tính data để khớp với logic Frontend
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// 3. Thêm sách mới có kèm ảnh (POST http://localhost:5555/books)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newBook = {
      ...req.body,
      image: req.file ? req.file.filename : ''
    };
    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 4. Cập nhật sách có kèm ảnh (PUT http://localhost:5555/books/:id)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const result = await Book.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) return res.status(404).json({ message: 'Không tìm thấy sách' });
    
    return res.status(200).json({ message: 'Cập nhật thành công', data: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 5. Xóa sách (DELETE http://localhost:5555/books/:id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Không tìm thấy sách' });
    return res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;