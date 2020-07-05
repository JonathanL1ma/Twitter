'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    owner: { type: String, required: true },
    follows: [{ type: String, required: true }]
})

module.exports = mongoose.model('follow', schema)