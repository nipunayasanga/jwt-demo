// routes/auth.js
// Import required libraries and modules
const express = require('express'); // Import Express for creating the router
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing and comparison
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation and verification
const User = require('../models/User'); // Import the User model for database interactions
const auth = require('../middleware/auth'); // Import the authentication middleware
const router = express.Router(); // Create a new router instance

// Register user
router.post('/register', async (req, res) => {
  // Destructure name, email, and password from the request body
  const { name, email, password } = req.body;

  try {
    // Check if a user already exists with the provided email
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user instance with hashed password
    user = new User({ name, email, password: await bcrypt.hash(password, 10) });
    await user.save(); // Save the new user to the database

    // Create a payload for the JWT containing the user's ID
    const payload = { user: { id: user.id } };
    // Sign the token with the secret key and set expiration
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err; // Handle error during token signing
      res.json({ token }); // Respond with the generated token
    });
  } catch (err) {
    res.status(500).send('Server error'); // Handle server errors
  }
});

// Login user
router.post('/login', async (req, res) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' }); // Handle user not found

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' }); // Handle password mismatch

    // Create a payload for the JWT containing the user's ID
    const payload = { user: { id: user.id } };
    // Sign the token with the secret key and set expiration
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err; // Handle error during token signing
      res.json({ token }); // Respond with the generated token
    });
  } catch (err) {
    res.status(500).send('Server error'); // Handle server errors
  }
});

// Get authenticated user
router.get('/me', auth, async (req, res) => {
  try {
    // Find the user by ID from the decoded token and exclude the password field
    const user = await User.findById(req.user.id).select('-password');
    res.json(user); // Respond with the user data
  } catch (err) {
    res.status(500).send('Server error'); // Handle server errors
  }
});

// Export the router to use in other parts of the application
module.exports = router;
