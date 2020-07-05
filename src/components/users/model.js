'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    tweets: { type: Number, required: true },
    followers: { type: Number, required: true },
    follows: { type: Number, required: true }
})

module.exports = mongoose.model('user', schema)
