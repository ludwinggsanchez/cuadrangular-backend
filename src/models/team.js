const mongoose = require('mongoose')
const { Schema } = mongoose

const TeamSchema = new Schema({
    name: String,
    image: String,
    points: Number
    });

module.exports = mongoose.model('team', TeamSchema)