var express = require('express');
var router = express.Router();
const imageRouter = require('./images')

router
  .use('/images', imageRouter)

module.exports = router;
