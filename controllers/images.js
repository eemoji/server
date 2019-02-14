const Image = require('../models/images')

module.exports = {
    create(req, res) {
        let data = JSON.parse(req.body.data)
        let newImage = {
            title: data.title,
            description: data.description
        }
        if (req.file) {
            newImage.image_url = req.file.cloudStoragePublicUrl
        }
        Image
            .create(newImage)
            .then(image => {
                res.status(201).json(image)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    },
    getAll(req, res) {
        Image
            .find()
            .then(images => {
                res.status(200).json(images)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    },
    update(req, res) {
        let data = JSON.parse(req.body.data)
        let newImage = {
            title: data.title,
            description: data.description
        }
        if (req.file) {
            newImage.image_url = req.file.cloudStoragePublicUrl
        }
        Image
            .findByIdAndUpdate(req.params.imageId, newImage, { new: true })
            .then(image => {
                res.status(200).json(image)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    },
    delete(req, res) {
        Image
            .findByIdAndDelete(req.params.imageId)
            .then(image => {
                res.status(200).json(image)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    }
}