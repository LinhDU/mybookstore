import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
    pages: { type: Number },
    //Thông tin bổ sung
    publisher: { type: String },
    issuedBy: { type: String },
    pubDate: { type: Number },
    size: { type: String },
    coverType: { type: String },
    description: { type: String },
    longDescription: { type: String },
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);