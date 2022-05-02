
const static = require('./static');
const auth = require('./auth');
const dashboard = require('./dashboard');
const account = require('./account');
const ui = require('./ui');

const useAuth = require('../middleware/useAuth');
const init = (server) => {
    server.use('/', static)
    server.use('/',  ui);
    server.use('/dashboard', useAuth, dashboard);
    server.use('/auth', auth);
    server.use('/account', account);
}

module.exports = {init};