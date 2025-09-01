const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Country = require('../models/Country');

// Get all countries
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please ensure MongoDB is running.' 
      });
    }
    
    const countries = await Country.find({ isActive: true });
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get country by ID
router.get('/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
