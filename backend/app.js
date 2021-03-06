const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/routes')

app.disable('x-powered-by')
app.use(express.json())
app.use(cors())
app.use('/api', routes)

module.exports = app
