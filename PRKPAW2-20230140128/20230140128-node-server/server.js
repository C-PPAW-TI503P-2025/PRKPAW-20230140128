const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/books', bookRoutes);

// Error handling (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});