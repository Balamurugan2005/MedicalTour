const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-tourism', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Please ensure MongoDB is running or update MONGODB_URI in your .env file');
});

// Routes
app.use('/api/countries', require('./routes/countries'));
app.use('/api/procedures', require('./routes/procedures'));
app.use('/api/costs', require('./routes/costs'));
app.use('/api/currency', require('./routes/currency'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Medical Tourism API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
