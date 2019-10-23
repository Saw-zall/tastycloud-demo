var assert = require('assert')
var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var server = require('../src/app')

chai.use(chaiHttp)

describe('Foodstuffs API Routes', function() {

  describe('POST /products', function() {

    chai.request(server)
    .post('/products')
    .send({
      title: 'a',
      description: 'b',
      price: 10,
      currency: '$'
    })
    .end(function(err, res) {

      it('should return 201', function (done) {
        res.should.have.status(201)
        done()
      })

      it('should be well formed', function (done) {
        res.should.be.json
        res.body.should.be.a('array')
        res.body.should.have.own.property('title')
        res.body.title.should.be.equal('a')
        res.body.should.have.own.property('description')
        res.body.title.should.be.equal('b')
        res.body.should.have.own.property('price')
        res.body.title.should.be.equal('10')
        res.body.should.have.own.property('currency')
        res.body.title.should.be.equal('$')
        done()
      })

    })

  })

  describe('POST /products', function() {

    chai.request(server)
    .post('/products')
    .send({
      title: null,
      description: '',
      price: -1,
      currency: 'u'
    })
    .end(function(err, res) {

      it('should return 422', function (done) {
        res.should.have.status(422)
        done()
      })

    })

  })

  describe('GET /products', function() {

    chai.request(server)
    .get('/products')
    .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      res.body.length.should.equal(4)
      res.body[0].should.have.own.property('title')
      res.body[0].should.have.own.property('description')
      res.body[0].should.have.own.property('price')
      res.body[0].should.have.own.property('currency')
      done()
    })

  })

  describe('GET /products/1', function() {

    chai.request(server)
    .get('/products')
    .end(function(err, res) {

      it('should return 200', function (done) {
        res.should.have.status(200)
        done()
      })

      it('should be well formed', function (done) {
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.own.property('title')
        res.body.should.have.own.property('description')
        res.body.should.have.own.property('price')
        res.body.should.have.own.property('currency')
        done()
      })
    })

  })

  describe('GET /products/1212121211122', function() {

    chai.request(server)
    .get('/products')
    .end(function(err, res) {
      it('should return 404', function (done) {
        res.should.have.status(404)
        done()
      })
    })

  })

})