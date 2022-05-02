const { getFakeUser } = require("../../db");
const { encrypt } = require("../../utils/crypto");

module.exports.userLoginPost = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = getFakeUser(email);
        if(!user) {
            return res.render('auth/login', {
                ...req.body,
                error: 'User not found.',
            })
        }
        const {_id, isActive, picture, about, createdAt, referenceId, ...other} = user;
        req.session.user = encrypt(other);
        req.session.referenceId = referenceId
        res.redirect('/dashboard')

    } catch (error) {
        return res.render('auth/login', {
            ...req.body,
            error: 'Something went wrong. Please try again later',
        })
        
    }
}

module.exports.userLoginGet = async (req, res) => {
    if(req.session.user) {
        return res.redirect('/dashboard')
    } 
    res.render('auth/login', {
        email: 'ellismoses@rotodyne.com',
        password: '',
        error: '',
    })
}