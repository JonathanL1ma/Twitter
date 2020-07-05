"use strict";
const FollowerController = require('./followers/controller')
const FollowController = require('./follows/controller')
const TweetController = require('./tweets/controller')
const UserController = require('./users/controller')

const commands = async (command, data) => {
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
            break;

        case "delete_tweet":
            break;

        case "edit_tweet":
            break;

        case "view_tweets":
            break;

        case "follow":
            break;

        case "unfollow":
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
