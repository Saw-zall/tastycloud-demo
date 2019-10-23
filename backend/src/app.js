'use strict'

import http                     from 'http'
import express                  from 'express'
import logger                   from 'morgan'
import bodyParser               from 'body-parser'
import cors                     from 'cors'
import helmet                   from 'helmet'
import                               './config/db'

var __app = require('debug')('backend:app')

//const rateLimit  = require("express-rate-limit")
//const slowDown   = require('express-slow-down')
//const tools      = require('./helpers/tools')

__app('initializing...')
const app = express()
var   server = http.Server(app)

/* Security */
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))

var port = process.env.EXPRESS_PORT || 8080

app.use(`/products`, require('./endpoints/Products/Router'))
app.use(`/foodstuffs`, require('./endpoints/Foodstuffs/Router'))

app.use(function(req, res, next) {
  // console.log(req.path);
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  console.log(err);
  if (err.status === 404) {
    return (res.status(err.status).json({
      message: "Not found"
    }))
  } else if (err.status === 301) {
    return (res.status(err.status).json({
      message: "Not authorized"
    }))
  } else if (err.status !== 500) {
    return (res.status(err.status).json({
      message: err.message
    }))
  }
  res.status(500).json({
    message: "Internal server error"
  })
})

server.listen(port)

__app(`Server started on port : ${port}`)
__app('ready')
