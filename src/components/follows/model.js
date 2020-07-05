'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    user: String,
    follows: [String]
})

module.exports = mongoose.model('follow', schema)