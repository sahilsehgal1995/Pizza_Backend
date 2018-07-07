

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let core = require('./core/index');
let routes = require('./routes/index');
let models = require('./models');

let app = express();

let env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use('/', routes);

app.use(function (err, req, res, next) {
    let errorMessage;
    errorMessage = message.generateErrorMessage(err);
    res.status(errorMessage.status || 422);
    res.send(errorMessage);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))


module.exports = app;
