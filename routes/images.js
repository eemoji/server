var express = require('express');
var router = express.Router();
const image = require('../controllers/images')
const images = require('../helpers/images')

router
  .get('/', image.getAll)
  .post('/',
    images.multer.single('articleFile'),
    images.sendUploadToGCS,
    image.create)
  .put('/:imageId', image.update)
  .delete('/:imageId', image.delete)

module.exports = router;
