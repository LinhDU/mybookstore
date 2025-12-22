import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();

// 1. Lấy tất cả sách
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// 2. Thêm sách mới (Create)
router.post('/', async (req, res) => {
    try {
        // Kiểm tra dữ liệu đầu vào cơ bản
        if (!req.body.title || !req.body.author || !req.body.price) {
            return res.status(400).send({ message: 'Vui lòng nhập đầy đủ các trường bắt buộc: Tiêu đề, Tác giả, Giá' });
        }
        
        const newBook = await Book.create(req.body);
        // Trả về thông báo thành công
        res.status(201).send({ 
            message: 'Thêm sách thành công!', 
            data: newBook 
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// 3. Cập nhật thông tin sách (Update)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy sách để cập nhật' });
        }

        res.status(200).send({ message: 'Sách đã được cập nhật thành công!', data: result });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// 4. Xóa sách (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy sách để xóa' });
        }

        res.status(200).send({ message: 'Xóa sách thành công!' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default router;