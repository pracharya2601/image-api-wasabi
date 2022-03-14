const express = require("express");
const router = express.Router();

router.get("/account", async (req, res) => {
  try {
    res.render('account/account', {
        email: 'pracharya2601@gmail.com',
        user: '',
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;