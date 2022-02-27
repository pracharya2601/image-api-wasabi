require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')


const api = require("./api/v1/index");
const login = require('./route/login')
const account = require('./route/account');
const apiConsole = require('./route/console');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

app.use('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/', (req, res) => (
    res.render('index', {user: ''})
))
app.use('/', login);
app.use('/', account);
app.use('/', apiConsole);
app.use("/api", api);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));