'use strict'
const mongoose = require('mongoose')

const { app, LISTENEABLE_HOST, LISTENEABLE_PORT } = require('./app')
const ACTUAL_DATE = new Date()

function startExpressApp() {
    app.listen(LISTENEABLE_PORT, LISTENEABLE_HOST, () => {
        console.log(`[${ACTUAL_DATE}] ==> Server is listening on http://${LISTENEABLE_HOST}:${LISTENEABLE_PORT}`)
    })
}

async function connectMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Twitter', { useNewUrlParser: true, useUnifiedTopology: true })
        startExpressApp()
        process.on('SIGINT', async () => {
            try {
                await mongoose.disconnect()
                console.log(`[${ACTUAL_DATE}] ==> Server Closed`)
            } catch (error) {
                console.error(`[${ACTUAL_DATE}] ==> ${error.message}`)
            }
        })
    } catch (error) {
        console.error(`[${ACTUAL_DATE}] ==> ${error.message}`)
    }
}

connectMongo()