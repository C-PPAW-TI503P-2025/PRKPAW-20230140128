const { Book } = require('../models');

// Public endpoints
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book details', error: error.message });
    }
};

// Admin endpoints
const createBook = async (req, res) => {
    const { title, author, stock } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required.' });
    }

    try {
        const newBook = await Book.create({ title, author, stock: stock || 0 });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message });
    }
};

const updateBook = async (req, res) => {
    const { title, author, stock } = req.body;

    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.update({ title, author, stock });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.destroy();
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
