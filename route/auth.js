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
      if(req.body.email && req.body.password ) {
          res.redirect('/account')
      } 
    } catch (error) {
      return res.render('auth/login', {
          email: 'pracharya2601@gmail.com',
          error: 'this is error message',
          user: '',
      })
    }
});

router.get("/signup", async (req, res) => {
    // send email with code to login after password
    // set that code on cookie to verify
    try {
      res.render('auth/signup', {
          email: 'prakashachary',
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

router.post("/signup", async (req, res) => {
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
    if(req.body.email && req.body.password ) {
        res.redirect('/account')
    } 
  } catch (error) {
    return res.render('auth/signup', {
        email: 'pracharya2601@gmail.com',
        error: 'this is error message',
        firstName: 'Prakash',
        lastName: 'Acharya'
    })
  }
});

router.get("/resetpassword", async (req, res) => {
    // send email with code to login after password
    // set that code on cookie to verify
    try {
      res.render('auth/resetpassword', {
          email: '',
          error: '',
          user: '',
          message: '',
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


router.post("/resetpassword", async (req, res) => {
    /**
     * @body to login
     * @while load this page send email with code
     * @reason i am the only onw who is taking care of this.
     * @email get it from env
     * @password verified from env
     * @code on email
     */
    let email = req.body.email;
    let error;
    let message;
    if(email) {
      message = `Email has been sent to ${email}. Please check your email.`
    } else {
      error = `Email not found.`
    }
    res.render('auth/resetpassword', {
      email: '',
      error: error || '',
      user: '',
      message: message || '',
    })

});

router.get("/account/verify/:token", async (req, res) => {
  /**
   * @confirmType - emailsent, accountverified
   */
  try {
    res.render('auth/confirmscreen', {
      confirmType: 'emailsent'
    })
  } catch(error) {
    res.render('error/index', {
      errorType: 'clienterror',
      errorMessage: 'Something Went Wrond! Please try again later.'
    })
  }
})



module.exports = router;