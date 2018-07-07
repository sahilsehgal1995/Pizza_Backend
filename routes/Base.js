let express = require('express');
let router = express.Router();

// import {
// 	Base as baseController
// } from './../controllers';

/* GET users listing. */
router.route('/')
.get((req, res) => {	
  res.send('Base');
})

module.exports = router;
