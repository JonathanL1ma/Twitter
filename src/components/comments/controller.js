'use strict'
const Store = require('./store')

const replyTweet = async (data, user) => {
    try {
        const [tweet_id, ...content] = data
        const dataToReply = content.toString().split(',').join(' ')
        if (tweet_id) {
            return await Store.replyTweet(tweet_id, { reply_propietary: user, reply_content: dataToReply })
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { replyTweet }
