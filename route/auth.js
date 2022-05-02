const express = require("express");
const router = express.Router();

const {userLoginPost, userLoginGet} = require('../controller/auth/login');
const {userSignupPost, userSignupGet} = require('../controller/auth/signup');
const {resetPasswordPost, resetPasswordGet} = require('../controller/auth/resetPassword');


router.get("/login", userLoginGet); 
router.post("/login", userLoginPost);

router.get("/signup", userSignupGet);
router.post("/signup", userSignupPost);


router.get("/resetpassword", resetPasswordGet);
router.post("/resetpassword", resetPasswordPost);


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