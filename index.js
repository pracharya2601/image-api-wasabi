require('dotenv').config()
const express = require("express");
const session = require('express-session')
const path = require('path');
const {randomBytes} = require('crypto');
const app = express();

require("./redis");
let RedisStore = require("connect-redis")(session)

const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const rootRouter = require('./route/index');
const basicCombo = require('./middleware/basicCombo');
const authCheck = require('./middleware/authCheck');
const { socketHelper } = require('./socketdata');
const { decrypt } = require('./utils/crypto');

require('./redis');

const sessionMiddleWare = session({
    store: new RedisStore({client: cache}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    genid: function() {
        return randomBytes(8).toString("hex");
    },
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 10,
    }
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({limit: '10mb', extended: false}))

io.use((socket, next) => {
    sessionMiddleWare(socket.request, socket.request.res || {}, next);
})

app.use(sessionMiddleWare)
app.use(basicCombo);
app.use(authCheck);

app.use('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//router
rootRouter.init(app)

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
    if (error.statusCode === 301) {
        return res.status(301).redirect('/not-found');
    }
    if (error.statusCode === 401) {
        return res.redirect('/auth/login')
    }
    return res.status(error.statusCode).json({error: error.toString()})
})

const PORT = process.env.PORT || 8080;


io.use((socket, next) => {
    if(socket.request.session.user) {
        socket.user = decrypt(socket.request.session.user);
        next();
    } else {
        next(new Error('invalid'))
    }
})

io.on('connection', socketHelper);

app.set("socket", io)


app.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});