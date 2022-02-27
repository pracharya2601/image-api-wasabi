const express = require("express");
const router = express.Router();

router.get("/login", async (req, res) => {
  // send email with code to login after password
  // set that code on cookie to verify
  try {
    console.log('body');
    res.render('auth/login', {
        email: 'pracharya2601@gmail.com',
        error: '',
        user: '',
    })
    // res.json({
    //   status: 200,
    //   message: "Get data has successfully",
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
    /**
     * @body to login
     * @while load this page send email with code
     * @reason i am the only onw who is taking care of this.
     * @email get it from env
     * @password verified from env
     * @code on email
     */
  try {
    console.log('body', req.body);
    if(req.body.email && req.body.password && req.body.code) {
        res.redirect('account')
    }
  } catch (error) {
    return res.render('auth/login', {
        email: 'pracharya2601@gmail.com',
        error: 'this is error message',
        user: '',
    })
  }
});

module.exports = router;