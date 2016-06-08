// our router file for our API
var express = require('express');
router = express.Router()

router.route('/').get(function(req, res) {
  res.send('Hello World')
})

// send our router to our app
module.exports = router
