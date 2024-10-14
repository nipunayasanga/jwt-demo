// models/User.js
// Import the 'mongoose' library, which is used to interact with MongoDB in a structured way.
const mongoose = require('mongoose');

// Create a schema for the 'User' model. A schema defines the structure of documents within a collection in MongoDB.
const UserSchema = new mongoose.Schema({
  // The 'name' field is a string that is required, meaning it cannot be empty when creating a user.
  name: { type: String, required: true },

  // The 'email' field is a string that is required and must be unique, ensuring no two users can have the same email.
  email: { type: String, required: true, unique: true },

  // The 'password' field is a string that is required, meaning each user must have a password.
  password: { type: String, required: true },
});

// Export the model based on the 'UserSchema'. 
// The first argument 'User' is the name of the collection in MongoDB (it will be pluralized automatically to 'users').
// This allows other parts of the app to interact with the 'User' model.
module.exports = mongoose.model('User', UserSchema);

