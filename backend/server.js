const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const favRoutes = require('./routes/favouriteAuth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

