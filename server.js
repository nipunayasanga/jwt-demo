// server.js
// Import required libraries and modules
const express = require('express'); // Import Express framework for building web applications
const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const authRoutes = require('./routes/auth'); // Import authentication routes from the routes directory
const dotenv = require('dotenv'); // Import dotenv for loading environment variables

const app = express(); // Create an instance of Express

// Load environment variables from a .env file into process.env
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Use the new URL string parser
  useUnifiedTopology: true, // Use the unified topology layer for MongoDB
})
.then(() => console.log('MongoDB Connected')) // Log success message upon connection
.catch(err => console.error(err)); // Log any connection errors

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Define Routes
app.use('/api/auth', authRoutes); // Mount the authentication routes at the /api/auth endpoint

// Set the port for the server, defaulting to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Log the server start message
