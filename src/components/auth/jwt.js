'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'password'

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        user_name: user.user_name,
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }
    return jwt.encode(payload, secret)
}
