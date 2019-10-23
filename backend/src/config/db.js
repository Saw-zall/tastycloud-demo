var environment = process.env.NODE_ENV || 'development'
var config = require('../knexfile.js')[environment]
var { Model } = require('objection')
var Knex = require('knex')(config)

Model.knex(Knex)

module.exports = Knex