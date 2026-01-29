const { Book, BorrowLog } = require('../models');
const { sequelize } = require('../config/database');

const borrowBook = async (req, res) => {
    const { bookId, latitude, longitude } = req.body;
    const userId = req.headers['x-user-id'];

    if (!bookId || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ message: 'bookId, latitude, and longitude are required.' });
    }

    // Use a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
        const book = await Book.findByPk(bookId, { transaction });

        if (!book) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.stock <= 0) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Book out of stock' });
        }

        // Reduce stock
        await book.update({ stock: book.stock - 1 }, { transaction });

        // Create borrow log
        const log = await BorrowLog.create({
            userId,
            bookId,
            latitude,
            longitude,
            borrowDate: new Date(),
        }, { transaction });

        await transaction.commit();

        res.status(201).json({
            message: 'Book borrowed successfully',
            borrowLog: log,
            remainingStock: book.stock,
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error during borrowing process', error: error.message });
    }
};

const getAllLogs = async (req, res) => {
    try {
        const logs = await BorrowLog.findAll({
            include: [Book],
            order: [['borrowDate', 'DESC']],
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error: error.message });
    }
};

module.exports = {
    borrowBook,
    getAllLogs,
};
