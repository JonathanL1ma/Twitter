'use strict'
const Model = require('./model')
const UserModel = require('../users/model')
const CommentModel = require('../comments/model')
const RetweetModel = require('../retweets/model')

exports.addTweet = async (owner, tweet) => {
    try {
        const tweetsSpaceIsCreated = await Model.findOne({ owner })
        if (tweetsSpaceIsCreated) {
            await UserModel.findByIdAndUpdate(owner, { $inc: { tweets: 1 } })
            return await Model.findByIdAndUpdate(tweetsSpaceIsCreated._id, { $push: { tweets: tweet } }, { new: true })
        } else {
            const dataToCreate = { 
                ...tweet,
                theyLiked: [],
                likes: 0 
            }
            const newTweetsSpace = new Model({ owner, tweets: dataToCreate })
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
        let response = []
        const userFinded = await UserModel.findOne({ user_name })
        if (!userFinded) {
            throw new Error('User doesnt exists')
        }
        const { tweets } = await Model.findOne({ owner: userFinded._id })
        for (const tweet of tweets) {
            const replysFinded = await CommentModel.findOne({ tweet_id: tweet._id })
            const retweetsFinded = await RetweetModel.find({ retweets: { $elemMatch: { tweet_id: tweet._id } } }, {'retweets.$': 1})
            let retweets = []
            for (const retweet of retweetsFinded) {
                retweets.push(retweet.retweets.pop())
            }
            let replys = [];
            if (replysFinded) {
                replys = replysFinded.replys
            }
            const data = {
                Tweet: tweet,
                Replys: replys,
                Retweets: retweets
            }
            response.push(data)
        }
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.likeTweet = async (tweet, user) => {
    try {
        const tweetFinded = await Model.findOne({ tweets: { $elemMatch: { _id: tweet } } }, {'tweets.$': 1})
        let theyLiked = tweetFinded.tweets.pop().theyLiked
        if (theyLiked.includes(user)) {
            return 'You have already liked this tweet'
        } else {
            theyLiked = [...theyLiked, user]
            console.log(theyLiked)
            const tweetUpdated = await Model.findOneAndUpdate({ 'tweets._id': tweet }, { $set: { "tweets.$.theyLiked": theyLiked } , $inc: { "tweets.$.likes": 1 } }, { new: true })
            return tweetUpdated
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.dislikeTweet = async (tweet, user) => {
    try {
        const tweetFinded = await Model.findOne({ tweets: { $elemMatch: { _id: tweet } } }, {'tweets.$': 1})
        let theyLiked = tweetFinded.tweets.pop().theyLiked
        if (theyLiked.includes(user)) {
            let result = []
            theyLiked.forEach(element => {
                if (element !== user) {
                    result.push(element)
                }
            });
            const tweetUpdated = await Model.findOneAndUpdate({ 'tweets._id': tweet }, { $set: { "tweets.$.theyLiked": result } , $inc: { "tweets.$.likes": -1 } }, { new: true })
            return tweetUpdated
        } else {
            return 'You have never liked this tweet, so you cannot remove your like'
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}