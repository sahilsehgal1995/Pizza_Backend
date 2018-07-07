let express = require('express');
let router = express.Router();

/* GET users listing. */
router.route('/')
.get((req, res) => {	
  res.send('Base');
})

module.exports = router;
