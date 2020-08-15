'use strict'
const Model = require('./model')

exports.replyTweet = async (tweet_id, reply) => {
    try {
        const replySpace = await Model.findOne({ tweet_id })
        if (replySpace) {
            return await Model.findByIdAndUpdate(replySpace._id, { $push: { replys: reply } }, { new: true })
        } else {
            const newReplySpace = new Model({ tweet_id, replys: [ reply ] })
            return await newReplySpace.save()
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}