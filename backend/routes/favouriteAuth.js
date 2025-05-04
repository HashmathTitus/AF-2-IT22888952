const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Favorite = require('../models/Favorite');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/add', authenticate, async (req, res) => {
  const { countryCode } = req.body;

  if (!countryCode) {
    return res.status(400).json({ message: 'Country code is required' });
  }

  try {
    const existingFavorite = await Favorite.findOne({ userId: req.userId, countryCode });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Country is already in favorites' });
    }

    const newFavorite = new Favorite({ userId: req.userId, countryCode });
    await newFavorite.save();

    return res.status(200).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/remove', authenticate, async (req, res) => {
  const { countryCode } = req.body;

  if (!countryCode) {
    return res.status(400).json({ message: 'Country code is required' });
  }

  try {
    const removedFavorite = await Favorite.findOneAndDelete({ userId: req.userId, countryCode });
    if (!removedFavorite) {
      return res.status(400).json({ message: 'Country not found in favorites' });
    }

    return res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId });
    const favoriteCodes = favorites.map(fav => fav.countryCode);
    res.json({ favorites: favoriteCodes });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
