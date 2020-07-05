"use strict";
const FollowController = require('./follows/controller')
const TweetController = require('./tweets/controller')
const UserController = require('./users/controller')

const commands = async (command, data, payload) => {
    command = command.toLowerCase();
    switch (command) {
        case "register":
            if(data.length !== 2) {
                throw new Error('Bad Request')
            }
            return await UserController.registerAccount(data)

        case "login":
            if(data.length !== 2) {
                throw new Error('Bad Request')
            }
            return await UserController.loginAccount(data)

        case "add_tweet":
            if(!data.length) {
                throw new Error('Bad Request')
            }
            return await TweetController.addTweet(payload.sub, data)

        case "delete_tweet":
            if(data.length !== 1) {
                throw new Error('Bad Request')
            }
            return await TweetController.deleteTweet(payload.sub, data)

        case "edit_tweet":
            if (data.length < 2) {
                throw new Error('Bad Request')
            }
            const [ tweetID, ...tweetContent ] = data
            return await TweetController.updateTweet(payload.sub, tweetID, tweetContent)

        case "view_tweets":
            if (data.length !== 1) {
                throw new Error('Bad Request')
            }
            return await TweetController.viewTweets(data)

        case "follow":
            if (data.length !== 1) {
                throw new Error('Bad Request')
            }
            return await FollowController.follow(payload.sub, data)

        case "unfollow":
            if (data.length !== 1) {
                throw new Error('Bad Request')
            }
            return await FollowController.unfollow(payload.sub, data)
            break;

        case "profile":
            if (data.length !== 1) {
                throw new Error('Bad Request')
            }
            return await UserController.findAccount(data)

        default:
            throw new Error('Bad Request')
    }
};

module.exports = { commands };
