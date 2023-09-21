const express = require('express');
const data = require('./securitymanager')
const test = require('./pickupmanager')
const helmet = require('helmet')
const api = express()

api.use(helmet())
api.use(express.json())
api.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
api.get('/', (req, res) => {
    res.send('Welcome to the Scooper server!')
})

api.use(data)
api.use(test)

module.exports = api