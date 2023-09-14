const express = require('express')
const crypto = require('crypto')

const securitymanager = express()

securitymanager.use(express.json())

//generates unique key used for pupil pickup
function generateIdempotencyKey() {
    return crypto.randomUUID()
}

securitymanager.get('/key', (req, res) => {
    // const response = generateIdempotencyKey()
    const response = [{
        key: generateIdempotencyKey()
    }]
    res.status(200).json(response)
})

module.exports = securitymanager