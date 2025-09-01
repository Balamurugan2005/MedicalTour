const express = require('express');
const router = express.Router();
const currencyService = require('../services/currencyService');

// Get all supported currencies
router.get('/supported', async (req, res) => {
  try {
    const currencies = currencyService.getSupportedCurrencies();
    res.json(currencies);
  } catch (error) {
    console.error('Error getting supported currencies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current exchange rates
router.get('/rates', async (req, res) => {
  try {
    const rates = await currencyService.getExchangeRates();
    res.json(rates);
  } catch (error) {
    console.error('Error getting exchange rates:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Convert currency
router.get('/convert', async (req, res) => {
  try {
    const { amount, from, to } = req.query;
    
    if (!amount || !from || !to) {
      return res.status(400).json({ 
        message: 'Missing required parameters: amount, from, to' 
      });
    }

    const convertedAmount = await currencyService.convertCurrency(
      parseFloat(amount), 
      from.toUpperCase(), 
      to.toUpperCase()
    );

    res.json({
      original: { amount: parseFloat(amount), currency: from.toUpperCase() },
      converted: { amount: convertedAmount, currency: to.toUpperCase() },
      rate: convertedAmount / parseFloat(amount)
    });
  } catch (error) {
    console.error('Error converting currency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
