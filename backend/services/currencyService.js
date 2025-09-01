const axios = require('axios');

// Free currency API (no API key required)
const CURRENCY_API_BASE = 'https://api.exchangerate-api.com/v4/latest/USD';

class CurrencyService {
  constructor() {
    this.rates = {};
    this.lastUpdate = null;
    this.updateInterval = 1000 * 60 * 60; // Update every hour
  }

  async getExchangeRates() {
    const now = Date.now();
    
    // Return cached rates if they're still fresh
    if (this.lastUpdate && (now - this.lastUpdate) < this.updateInterval) {
      return this.rates;
    }

    try {
      const response = await axios.get(CURRENCY_API_BASE);
      this.rates = response.data.rates;
      this.lastUpdate = now;
      return this.rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Return default rates if API fails
      return {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110,
        CAD: 1.25,
        AUD: 1.35,
        CHF: 0.92,
        CNY: 6.45,
        INR: 75,
        KRW: 1100,
        MXN: 20,
        TRY: 8.5,
        VND: 23000,
        COP: 3800
      };
    }
  }

  async convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = await this.getExchangeRates();
    
    if (fromCurrency === toCurrency) {
      return amount;
    }

    // Convert to USD first, then to target currency
    const usdAmount = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
    const convertedAmount = toCurrency === 'USD' ? usdAmount : usdAmount * rates[toCurrency];
    
    return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
  }

  getSupportedCurrencies() {
    return [
      { code: 'USD', name: 'US Dollar', symbol: '$' },
      { code: 'EUR', name: 'Euro', symbol: '€' },
      { code: 'GBP', name: 'British Pound', symbol: '£' },
      { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
      { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
      { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
      { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
      { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
      { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
      { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
      { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
      { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
      { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
      { code: 'COP', name: 'Colombian Peso', symbol: '$' }
    ];
  }
}

module.exports = new CurrencyService();


