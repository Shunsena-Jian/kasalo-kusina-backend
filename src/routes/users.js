const express = require('express');
const router = express.Router();

// Get User Details
router.get('/', (req, res) => {
    res.send('This is GET users');
});

module.exports = router;