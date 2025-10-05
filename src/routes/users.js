import express from 'express';
const router = express.Router();

// Get User Details
router.get('/', (req, res) => {
    res.send('This is GET users');
});

export default router;