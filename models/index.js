const Book = require('./book');
const BorrowLog = require('./borrowLog');

// Define associations
Book.hasMany(BorrowLog, { foreignKey: 'bookId' });
BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
    Book,
    BorrowLog,
};
