let express = require('express');
let router = express.Router();

let IndexRoute = require('./IndexRoute');
let Base = require('./Base');

/* GET home page. */
router.use('/', IndexRoute);
router.use('/base', Base);

module.exports = router;
