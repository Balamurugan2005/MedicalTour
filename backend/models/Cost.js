const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
  procedure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Procedure',
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  usCost: {
    type: Number,
    required: true
  },
  localCost: {
    type: Number,
    required: true
  },
  savings: {
    type: Number,
    required: false  // Will be calculated automatically
  },
  savingsPercentage: {
    type: Number,
    required: false  // Will be calculated automatically
  },
  currency: {
    type: String,
    default: 'USD'
  },
  // Additional travel costs
  flightCost: {
    type: Number,
    default: 0
  },
  hotelCost: {
    type: Number,
    default: 0
  },
  visaCost: {
    type: Number,
    default: 0
  },
  insuranceCost: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calculate savings and percentage before saving
costSchema.pre('save', function(next) {
  if (this.usCost && this.localCost) {
    this.savings = this.usCost - this.localCost;
    this.savingsPercentage = Math.round((this.savings / this.usCost) * 100);
  }
  next();
});

module.exports = mongoose.model('Cost', costSchema);
