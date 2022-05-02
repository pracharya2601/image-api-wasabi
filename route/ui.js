const express = require("express");
const router = express.Router();

router.get('/success', (req, res) => {
    res.render('success/index', {
        message: "Email has been sent. Please confirm your email",
    })
})
router.get('/error', (req, res) => {
    res.render('error/index', {
        message: "",
    })
})

router.get('/testing', (req, res) => {
    res.error(400).json({message: 'this is working'})
})

module.exports = router;