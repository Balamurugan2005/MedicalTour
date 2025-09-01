const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Procedure = require('../models/Procedure');

// Get all procedures
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please ensure MongoDB is running.' 
      });
    }
    
    const procedures = await Procedure.find({ isActive: true });
    res.json(procedures);
  } catch (error) {
    console.error('Error fetching procedures:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get procedures by category
router.get('/category/:category', async (req, res) => {
  try {
    const procedures = await Procedure.find({ 
      category: req.params.category, 
      isActive: true 
    });
    res.json(procedures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get procedure by ID
router.get('/:id', async (req, res) => {
  try {
    const procedure = await Procedure.findById(req.params.id);
    if (!procedure) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.json(procedure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
