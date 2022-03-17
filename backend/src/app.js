const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors');

const { error404, generalErrorHandler } = require('./middlewares')

const app = express()

app.use(cors());

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', require('./routes/v1'))

// catch 404 and forward to error handler
app.use(error404)

// error handler
app.use(generalErrorHandler)

module.exports = app
