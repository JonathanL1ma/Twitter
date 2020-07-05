'use strict'
const express = require('express')
const router = express.Router()

const Network = require('./network')
const response = require('../network/response')
const Authorization = require('./auth/authentication')

router.post('/', Authorization.ensureAuth, async (req, res) => {
    const { commands } = req.body
    const splitCommand = commands.split(' ')
    const getCommand = splitCommand[0]
    let data = []

    for (let i = 1; i < splitCommand.length; i++) {
        const newData = splitCommand[i];
        data.push(newData)
    }

    try {
        const commands = await Network.commands(getCommand, data)
        response.success(res, commands, 200)
    } catch (error) {
        console.error('[ERROR] => ', error)
        response.error(error, res, 400, error.message)
    }
})

module.exports = router
