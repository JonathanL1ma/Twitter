'use strict';
const bcrypt = require('bcryptjs');

const Store = require('./store');
const jwt = require('../auth/jwt');

const registerAccount = async (data, tweets = 0, followers = 0, follows = 0) => {
    try {
        if (data) {
            const user_name = data[0]
            let password = data[1]
            password = await bcrypt.hash(password, 5)
            return await Store.registerAccount({ user_name, password, tweets, followers, follows })
        }
        throw new Error('Missing Data')
    } catch (error) {
        console.error('[ERROR] =>', error);
        throw error;
    }
};

const loginAccount = async (data) => {
    try {
        if (data) {
            const user_name = data[0]
            const password = data[1]
            const account = await Store.loginAccount(user_name)
            if (!account) {
                throw new Error('Bad Request')
            }
            const comparedPassword = await bcrypt.compare(password, account.password)
            if (!comparedPassword) {
                throw new Error('Unauthorized')
            }
            return await jwt.createToken(account)
        }
        throw new Error('Missing Data')
    } catch (error) {
        console.error('[ERROR] =>', error)
        throw error
    }
}

const findAccount = async (data) => {
    try {
        return await Store.findAccount(data[0])
    } catch (error) {
        console.error('[ERROR] =>', error)
        throw new Error(error)
    }
}

module.exports = { registerAccount, loginAccount, findAccount }
