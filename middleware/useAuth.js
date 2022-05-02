const { decrypt } = require("../utils/crypto");

module.exports = async function(req, res, next) {
    if(!req.session.user) {
        res.locals.authenticated = false;
        res.locals.userData = null;
        const error = new Error(`Not authorized.`)
        error.statusCode = 401;
        error.apple = "this is apple"
        return next(error); 
    }
    const user = decrypt(req.session.user);
    req.user = user;
    res.locals.userData = user;
    res.locals.authenticated = true;
    next();
}