import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is GET auth');
});

router.post('/login', (req, res) => {

});

router.post('/register', (req, res) => {

});

export default router;