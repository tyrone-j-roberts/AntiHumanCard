const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', async (req, res, next) => {
    
    res.render('index', { 
        title: "Anit Human Card - Lobby",
    });
});

module.exports = router;