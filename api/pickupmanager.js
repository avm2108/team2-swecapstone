const express = require('express')

const pickupmanager = express()

pickupmanager.use(express.json())

function getPickUpLocation() {
    return ''
}

pickupmanager.get('/parking', (req, res) => {
    const response = getPickUpLocation()
    res.status(200).json(response)
})

module.exports = pickupmanager