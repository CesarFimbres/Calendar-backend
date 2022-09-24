const express = require('express')
const cors = require( 'cors' )
const { dbConnection } = require('./db/config')

require('dotenv').config()
const { PORT } = process.env

// Clear console output
console.clear()

const app = express()

// DB Config
dbConnection()

// CORS
app.use( cors() )

// Public directory
app.use(express.static('public'))

// Body, read and parse
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))

// Express
app.listen(PORT, () => {
	console.log(`\x1b[36m Server is running on http://localhost:${PORT} \x1b[0m`);
})

