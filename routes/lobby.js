const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', async (req, res, next) => {
    
    res.render('lobby', { 
        title: "Anit Human Card - Lobby",
    });
});

module.exports = router;