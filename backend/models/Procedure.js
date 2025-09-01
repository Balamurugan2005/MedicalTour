const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['cosmetic', 'dental', 'imaging', 'other']
  },
  description: {
    type: String,
    required: true
  },
  isNonInvasive: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Procedure', procedureSchema);

