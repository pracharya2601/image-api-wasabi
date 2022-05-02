

module.exports.userSignupPost = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password, confirmPassword} = req.body;
        return res.redirect(`/success?redirectUrl=${encodeURIComponent("/auth/login")}`);
    } catch(error) {
        return res.render('auth/signup', {
            ...req.body,
            error: "Something went wrong. Please try agian later."
        })

    }
}
module.exports.userSignupGet = async (req, res, next) => {
    if(req.session.user) {
        return res.redirect('/dashboard')
    } 
    res.render('auth/signup', {
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        confirmPassword: '',
        error: '',
    })
}