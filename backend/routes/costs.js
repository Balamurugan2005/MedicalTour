const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

// Get all costs with populated references
router.get('/', async (req, res) => {
  try {
    const costs = await Cost.find({ isActive: true })
      .populate('procedure')
      .populate('country');
    res.json(costs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get costs by procedure
router.get('/procedure/:procedureId', async (req, res) => {
  try {
    const costs = await Cost.find({ 
      procedure: req.params.procedureId, 
      isActive: true 
    })
    .populate('procedure')
    .populate('country');
    res.json(costs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get costs by country
router.get('/country/:countryId', async (req, res) => {
  try {
    const costs = await Cost.find({ 
      country: req.params.countryId, 
      isActive: true 
    })
    .populate('procedure')
    .populate('country');
    res.json(costs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get cost comparison for specific procedure and country
router.get('/compare/:procedureId/:countryId', async (req, res) => {
  try {
    const cost = await Cost.findOne({ 
      procedure: req.params.procedureId, 
      country: req.params.countryId, 
      isActive: true 
    })
    .populate('procedure')
    .populate('country');
    
    if (!cost) {
      return res.status(404).json({ message: 'Cost comparison not found' });
    }
    
    res.json(cost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


