'use strict'
const Model = require('./model')

exports.registerAccount = async (user) => {
    try {
        const findAccount = await Model.findOne({ user_name: user.user_name })
        if (findAccount) {
            throw new Error('Unauthorized')
        }
        const newAccount = new Model(user)
        return await newAccount.save()
    } catch (error) {
        console.error('[ERROR] => ', error)
        throw error
    }
}

exports.loginAccount = async (user_name) => {
    try {
        return await Model.findOne({ user_name })
    } catch (error) {
        console.error('[ERROR] => ', error)
        throw error
    }
}

exports.findAccount = async (user_name) => {
    try {
        return await Model.findOne({ user_name })
    } catch (error) {
        console.error('[ERROR] => ', error)
        throw error
    }
}
