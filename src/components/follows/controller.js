'use strict'
const Store = require('./store')

const follow = async (owner, user) => {
    try {
        user = user.pop()
        return await Store.follow(owner, user)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const unfollow = async (owner, user) => {
    try {
        user = user.pop()
        return await Store.unfollow(owner, user)
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { follow, unfollow }