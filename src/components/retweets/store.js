const Model = require('./model')
const TweetModel = require('../tweets/model')

exports.retweet = async (tweet, user, optional_message) => {
    try {
        const tweetFinded = await TweetModel.findOne({ tweets: { $elemMatch: { _id: tweet } } }, {'tweets.$': 1})
        const tweet_owner = tweetFinded.owner
        const content = tweetFinded.tweets.pop().content
        if (tweetFinded) {
            const retweetExists = await Model.findOne({ retweets: { $elemMatch: { tweet_id: tweet } }, owner: user }, {'retweets.$': 1})
            if (!retweetExists) {
                const data = {
                    tweet_id: tweet,
                    tweet_owner,
                    content,
                    optional_message
                }
                return await Model.findOneAndUpdate({ owner: user }, { $push: { retweets: data } }, { new: true })
            } else {
                return await Model.findOneAndUpdate({ owner: user, retweets: { $elemMatch: { tweet_id: tweet } } }, { $pull: { retweets: { tweet_id: tweet } } }, { new: true })
            }
        } else {
            throw new Error('Tweet doesnt exists')
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
