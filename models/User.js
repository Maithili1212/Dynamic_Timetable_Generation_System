const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  token:     { type: String },
  loginAt:   { type: Date, default: Date.now },
  logoutAt:  { type: Date, default: null },
  isActive:  { type: Boolean, default: true },
  userAgent: { type: String },
  ip:        { type: String },
});

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['Admin / HOD', 'Teacher / Faculty', 'Student'], default: 'Student' },
  department: { type: String, default: '' }, // e.g. "CSE - AIML"
  isOnline:    { type: Boolean, default: false },
  lastLoginAt: { type: Date, default: null },
  sessions:    [sessionSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);