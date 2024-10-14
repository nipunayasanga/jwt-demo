// middleware/auth.js
// Import the 'jsonwebtoken' library, which is used to work with JSON Web Tokens (JWT) for authentication.
const jwt = require('jsonwebtoken');

// Export a middleware function that will be used to verify JWT in requests.
module.exports = function (req, res, next) {
  // Retrieve the token from the 'auth-token' header of the request.
  const token = req.header('auth-token');

  // If no token is provided in the request, respond with a 401 (Unauthorized) status and an error message.
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify the token using the secret key (stored in environment variables as 'SECRET_KEY').
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded user information to the request object (usually contains the user's ID or other data).
    req.user = decoded.user;

    // Call the 'next()' function to pass control to the next middleware or route handler.
    next();
  } catch (err) {
    // If token verification fails (e.g., the token is invalid), respond with a 401 status and an error message.
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

