// our router file for our API
var express = require('express')
router = express.Router()
var ModelBase = require('bookshelf-modelbase')(bookshelf)

router.route('/').get(function(req, res) {
  res.send('Hello World')
})
var yourTable = ModelBase.extend({
  tableName: 'post_contents'
})

// api route
router.route('/logToDatabase').post(function(req, res) {
  console.log(req.body)
  yourTable.create({ 'post_contents' : req.body })
    .catch((error) => {
      console.log(error)
      res.send("error")
    })
    .then((collection) => {
      console.log( 'record added:' + collection )
      res.send('Record added to DB')
    })
})
// send our router to our app
module.exports = router
