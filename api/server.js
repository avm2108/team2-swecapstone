const express = require('express');
const data = require('./securitymanager')
const api = express()

api.use(express.json())

api.get('/', (req, res) => {
    res.send('Welcome to the Scooper server!')
})

api.use(data)

module.exports = api