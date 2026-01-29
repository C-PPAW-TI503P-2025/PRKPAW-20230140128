const { Book } = require('./models');

const seedData = async () => {
    try {
        const count = await Book.count();
        if (count === 0) {
            console.log('Seeding initial data...');
            await Book.bulkCreate([
                { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: 5 },
                { title: '1984', author: 'George Orwell', stock: 3 },
                { title: 'To Kill a Mockingbird', author: 'Harper Lee', stock: 8 },
                { title: 'Clean Code', author: 'Robert C. Martin', stock: 10 },
                { title: 'Refactoring', author: 'Martin Fowler', stock: 4 },
            ]);
            console.log('Seeding completed.');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

module.exports = seedData;
