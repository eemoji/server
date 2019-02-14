var express = require('express');
var router = express.Router();
const image = require('../controllers/images')

router
  .get('/', image.getAll)
  .post('/', image.create)
  .put('/', image.update)
  .delete('/', image.delete)

module.exports = router;
