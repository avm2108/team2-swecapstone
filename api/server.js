const express = require('express');
const data = require('./securitymanager')
const test = require('./pickupmanager')
const helmet = require('helmet')
const api = express()

api.use(helmet())
api.use(express.json())

api.get('/', (req, res) => {
    res.send('Welcome to the Scooper server!')
})

api.use(data)
api.use(test)

module.exports = api