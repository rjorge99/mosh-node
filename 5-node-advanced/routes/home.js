const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello world');
});

//returning with template engine
router.get('/pug', (req, res) => {
    res.render('index', { title: 'My Express Template', message: 'Hello' });
});

module.exports = router;
