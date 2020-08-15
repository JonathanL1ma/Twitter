const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    owner: { type: String, required: true },
    retweets: [{
        tweet_id: { type: String, required: true },
        tweet_owner: { type: String, required: true },
        content: { type: String, required: true },
        optional_message: { type: String, required: false }
    }]
})

module.exports = mongoose.model('retweet', schema)
