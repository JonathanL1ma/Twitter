'use strict'
const ROUTER_COMMANDS = require('../components/')

exports.routing = (app) => {
    app.use('/commands', ROUTER_COMMANDS)
}
