const Image = require('../models/images')
const cloudinary = require('cloudinary');

module.exports = {
    create(req, res) {
        let data = JSON.parse(req.body.data)
        let newImage = {
            title: data.title,
            description: data.description,
            createdAt: new Date(),
        }
        //let newImage = {}

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_cloud_name,
            api_key: process.env.CLOUDINARY_api_key,
            api_secret: process.env.CLOUDINARY_api_secret,
        });

        cloudinary.uploader.upload(req.file.cloudStoragePublicUrl, function (result) {

            if (req.file) {
                newImage.image_url = req.file.cloudStoragePublicUrl
                newImage.cloudinary_url = result.secure_url
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
        });
    },
    getAll(req, res) {
        let effectsStr = `al_dente,athena,audrey,aurora,daguerre,eucalyptus,fes,frost,hairspray,hokusai,incognito,linen,peacock,primavera,quartz,red_rock,refresh,sizzle,sonnet,ukulele,zorro`
        let effects = effectsStr.split(',')

        Image
            .find().sort({ createdAt: -1 }).limit(100).lean()
            .then(images => {
                for (let image of images) {
                    if (image.cloudinary_url) {
                        image.effects = []
                        let urlSplit = image.cloudinary_url.split('/')

                        for (let effect of effects) {
                            let url = [...urlSplit]
                            url.splice(6, 0, 'e_art:' + effect)
                            image.effects.push({
                                name: effect,
                                url: url.join('/')
                            })
                        }
                    }
                }
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
            description: data.description,
            image_url: data.image_url
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