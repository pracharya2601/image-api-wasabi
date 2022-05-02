module.exports.resetPasswordPost = async (req, res, next) => {
    try {
        const {email} = req.body;
        res.redirect('/auth/login')
        //message is sent please check your email
    } catch (error) {
        return res.render('auth/resetpassword', {
            ...req.body,
            error: 'Something went wrong. Please try again later',
        })
        
    }
}

module.exports.resetPasswordGet = async (req, res) => {
    if(req.session.user) {
        return res.redirect('/dashboard')
    } 
    res.render('auth/resetpassword', {
        email: '',
        error: '',
    })
}