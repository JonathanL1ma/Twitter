'use strict'
const Model = require('./model')
const FollowersModel = require('../followers/model')
const UserModel = require('../users/model')

exports.follow = async (owner, user) => {
    try {
        const myUser = await UserModel.findOne({ _id: owner })
        const userToFollow = await UserModel.findOne({ user_name: user })
        const followsSpace = await Model.findOne({ owner: myUser._id })
        const followersSpace = await FollowersModel.findOne({ owner: userToFollow._id })
        if(followsSpace && followersSpace) {
            await UserModel.findByIdAndUpdate(myUser._id, { $inc: { follows: 1 } })
            await UserModel.findByIdAndUpdate(userToFollow._id, { $inc: { followers: 1 } })
            await FollowersModel.findOneAndUpdate({ owner: userToFollow._id }, { $addToSet: { followers: myUser.user_name } })
            return await Model.findOneAndUpdate({ owner }, { $addToSet: { follows: user } }, { new: true })
        }
        throw new Error('Unexpected Error')
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.unfollow = async (owner, user) => {
    try {
        const myUser = await UserModel.findOne({ _id: owner })
        const userToFollow = await UserModel.findOne({ user_name: user })
        await UserModel.findByIdAndUpdate(myUser._id, { $inc: { follows: -1 } })
        await UserModel.findByIdAndUpdate(userToFollow._id, { $inc: { followers: -1 } })
        await FollowersModel.findOneAndUpdate({ owner: userToFollow._id }, { $pull: { followers: myUser.user_name } })
        return await Model.findOneAndUpdate({ owner }, { $pull: { follows: user } }, { new: true })
    } catch (error) {
        console.error(error)
        throw error
    }
}