const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  // Stage 1 fields
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
    trim: true,
  },
  businessEmail: {
    type: String,
    required: [true, 'Please provide a business email'],
    match: [
      /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|protonmail\.com|mail\.com|zoho\.com|icloud\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please provide a valid business email',
    ],
    unique: true,
    lowercase: true,
    trim: true,
  },
  
  // Stage 2 fields
  designation: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      'Bank / Financial Institution',
      'Exchange House',
      'Fintech Company',
      'Investor (Angel / VC / PE)',
      'Government / Regulatory',
      'Other',
    ],
  },
  otherCategory: {
    type: String,
    trim: true,
  },
  exploreOptions: {
    type: [String],
  },
  otherOption: {
    type: String,
    trim: true,
  },
  
  // Status fields
  stageCompleted: {
    type: Number,
    default: 1, // 1 = stage 1 completed, 2 = stage 2 completed
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
ContactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Contact', ContactSchema);