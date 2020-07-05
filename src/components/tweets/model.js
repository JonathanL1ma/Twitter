'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    owner: { type: String, required: true },
    tweets: [{
        content: { type: String, required: true }
    }]
})

module.exports = mongoose.model('tweet', schema)