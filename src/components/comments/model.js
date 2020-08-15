'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    tweet_id: { type: String, required: true },
    replys: [{
        reply_propietary: { type: String, required: true },
        reply_content: { type: String, required: true }
    }]
})

module.exports = mongoose.model('comment', schema)
