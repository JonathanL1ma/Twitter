'use strict'
const Model = require('./model')
const UserModel = require('../users/model')

exports.addTweet = async (owner, tweet) => {
    try {
        const tweetsSpaceIsCreated = await Model.findOne({ owner })
        if (tweetsSpaceIsCreated) {
            await UserModel.findByIdAndUpdate(owner, { $inc: { tweets: 1 } })
            return await Model.findByIdAndUpdate(tweetsSpaceIsCreated._id, { $push: { tweets: tweet } }, { new: true })
        } else {
            const newTweetsSpace = new Model({ owner, tweets: tweet })
            return await newTweetsSpace.save()
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.updateTweet = async (owner, tweet, tweetContent) => {
    try {
        return await Model.findOneAndUpdate({ owner, "tweets._id": tweet }, { $set: { "tweets.$.content": tweetContent } }, { new: true } )
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.deleteTweet = async (owner, tweet) => {
    try {
        await UserModel.findByIdAndUpdate(owner, { $inc: { tweets: -1 } })
        return await Model.findOneAndUpdate({ owner, tweets: { $elemMatch: { _id: tweet } } }, { $pull: { tweets: { _id: tweet } } }, { new: true })
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.viewTweets = async (user_name) => {
    try {
        const findUser = await UserModel.findOne({ user_name })
        if (findUser) {
            return await Model.findOne({ owner: findUser._id })
        }
        throw new Error('User doesnt exists')
    } catch (error) {
        console.error(error)
        throw error
    }
}