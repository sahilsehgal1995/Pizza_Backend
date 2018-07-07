var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.status(200);
	res.send({
		status: 'running',
		message: 'Welcome to pizza api'
	});
});

module.exports = router;