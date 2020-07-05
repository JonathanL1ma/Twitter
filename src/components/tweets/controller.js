'use strict'
const Store = require('./store')

const addTweet = async (owner, data) => {
    let contentToTweet = {}
    try {
        if (data) {
            const content = data.toString().split(',').join(' ')
            contentToTweet.content = content
            return await Store.addTweet(owner, contentToTweet)
        }
        throw new Error('Bad Request')
    } catch (error) {
        console.error(error)
        throw error
    }
}

const updateTweet = async (owner, tweet, tweetContent) => {
    try {
        if(tweet && tweetContent) {
            const content = tweetContent.toString().split(',').join(' ')
            return await Store.updateTweet(owner, tweet, content)
        }
        throw new Error('Bad Request')
    } catch (error) {
        console.error(error)
        throw error
    }
}

const deleteTweet = async (owner, tweet) => {
    try {
        if(tweet) {
            tweet = tweet.pop()
            console.log(tweet)
            return await Store.deleteTweet(owner, tweet)
        }
        throw new Error('Bad Request')
    } catch (error) {
        console.error(error)
        throw error
    }
}

const viewTweets = async (user_name) => {
    try {
        if (user_name) {
            user_name = user_name.pop()
            return await Store.viewTweets(user_name)
        }
        throw new Error('Bad Request')
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { addTweet, updateTweet, deleteTweet, viewTweets }
