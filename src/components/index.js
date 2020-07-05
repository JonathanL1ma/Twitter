'use strict'
const express = require('express')
const router = express.Router()

const Network = require('./network')
const response = require('../network/response')
const Authorization = require('./auth/authentication')

router.post('/', Authorization.ensureAuth, async (req, res) => {
    const { commands } = req.body
    const getParams = commands.split(' ')
    const [command, ...data] = getParams;
    
    try {
        const commands = await Network.commands(command, data)
        response.success(res, commands, 200)
    } catch (error) {
        console.error('[ERROR] => ', error)
        response.error(error, res, 400, error.message)
    }
})

module.exports = router
