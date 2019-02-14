const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    image_url: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image