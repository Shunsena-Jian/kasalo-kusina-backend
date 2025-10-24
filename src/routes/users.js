import express from 'express';
const router = express.Router();

// Get User Details
router.get('/', (req, res) => {
    res.send('This is GET users');
});

router.post('/register', (req, res) => {
    res.send(req.body);
});

export default router;