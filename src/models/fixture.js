const mongoose = require('mongoose')
const { Schema } = mongoose

const FixtureSchema = new Schema({
    team1: String,
    score1: Number,
    team2: String,
    score2: Number
    });

module.exports = mongoose.model('fixture', FixtureSchema)