'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const { routing } = require('./network/routes')

const app = express()
const DEFAULT_PORT = 4000
const DEFAULT_HOST = 'localhost'
const PORT = 'port'
const HOST = 'host'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routing(app)

app.set(PORT, process.env.PORT || DEFAULT_PORT)
app.set(HOST, process.env.HOST || DEFAULT_HOST)

const LISTENEABLE_PORT = app.get(PORT)
const LISTENEABLE_HOST = app.get(HOST)

module.exports = { app, LISTENEABLE_HOST, LISTENEABLE_PORT }