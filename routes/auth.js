const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const normalizedDepartment = role === 'Admin / HOD' ? (department || '').trim() : '';
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      department: normalizedDepartment
    });
    await user.save();

    res.status(201).json({ message: 'Account created successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password, role, department } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check role
    if (user.role !== role) {
      return res.status(400).json({ message: 'Incorrect role selected' });
    }

    const requestedDepartment = (department || '').trim();
    if (user.role === 'Admin / HOD') {
      if (!user.department && requestedDepartment) {
        user.department = requestedDepartment;
        await user.save();
      } else if (user.department && requestedDepartment && user.department !== requestedDepartment) {
        return res.status(400).json({ message: 'Incorrect department selected' });
      }
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role, department: user.department || '' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful!',
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      department: user.department || requestedDepartment || ''
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;