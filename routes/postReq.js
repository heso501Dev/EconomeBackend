const express = require('express'),
      router = express.Router(),
      {register, login} = require('../controllers/postControllers');
// ===========
// Middleware
// ===========
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// ============
// Routes 
// ============

// Register new user
router.post('/register', register);
// Login
router.post('/login', login);

module.exports = router;