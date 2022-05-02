const parseurl = require('parseurl');
const {randomBytes} = require('crypto');

const os = require('os');
const allNetworkInterfaces = os.networkInterfaces();
const pltform = os.platform();
//const uptime = os.uptime();
const userInfo = os.userInfo();
//const cpus = os.cpus();

const browser = (ua) => {
    $ = {};
    if (/mobile/i.test(ua))
        $.Mobile = true;

    if (/like Mac OS X/.test(ua)) {
        $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        $.iPhone = /iPhone/.test(ua);
        $.iPad = /iPad/.test(ua);
    }

    if (/Android/.test(ua))
        $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

    if (/webOS\//.test(ua))
        $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

    if (/(Intel|PPC) Mac OS X/.test(ua))
        $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

    if (/Windows NT/.test(ua))
        $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

    return $;
}

module.exports = function(req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }
    if (!req.session.csrf) {
        req.session.csrf = randomBytes(100).toString('base64');
    }
    if(!req.session.device) {
        req.session.device = browser(req.headers['user-agent'])
    }
    // console.log(pltform);
    // console.log(userInfo);

    // get the url pathname
    var pathname = parseurl(req).pathname
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    res.locals.authenticated = false;
    next()
}