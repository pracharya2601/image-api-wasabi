module.exports = function(req, res, next) {
    res.locals.authenticated = req.session.user ? true : false;
    next();
}