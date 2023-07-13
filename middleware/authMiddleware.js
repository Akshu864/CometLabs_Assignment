// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, 'akshay-1', (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     req.user = decodedToken;
//     next();
//   });
// };

// module.exports = authMiddleware;


// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, 'akshay-1', (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     req.user = decodedToken;

//     // Check if the user is an admin
//     if (req.user.role && req.user.role === 'admin') {
//       // User is an admin
//       next();
//     } else {
//       // User is not an admin
//       return res.status(403).json({ error: 'Forbidden: Access denied' });
//     }
//   });
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, 'akshay-1', (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     req.user = decodedToken;

//     // Check if the user is an admin
//     if (req.user.role === 'admin') {
//       // User is an admin
//       next();
//     } else {
//       // User is not an admin
//       return res.status(403).json({ error: 'Forbidden: Access denied' });
//     }
//   });
// };

// module.exports = authMiddleware;


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'Token', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decodedToken;

    // Log the decoded token and role value
    console.log('Decoded Token:', decodedToken);
    console.log('Role:', req.user.role);

    // Check if the user is an admin
    if (req.user.role && req.user.role === 'admin') {
      // User is an admin
      return next();
    }

    // User is not an admin
    return res.status(403).json({ error: 'Forbidden: Access denied' });
  });
};

module.exports = authMiddleware;


