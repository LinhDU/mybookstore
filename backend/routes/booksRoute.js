import express from 'express';
import { Book } from '../models/bookModel.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query;
    let filter = {};

    // Tìm kiếm theo từ
    if (q && q.trim() !== "") {
      filter.$or = [
        { title: { $regex: q.trim(), $options: 'i' } },
        { author: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Lọc theo thể loại
    if (category && category.trim() !== "") {
      filter.category = category.trim();
    }

    console.log("QUERY:", req.query);
    console.log("FILTER:", filter);

    const books = await Book.find(filter);

    return res.status(200).json({
      data: books,
      count: books.length
    });
  } catch (error) {
    console.error("BOOKS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

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

// Cập nhật trạng thái Hero/Featured
router.patch('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isHero, isFeatured } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { isHero, isFeatured }, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


export default router;