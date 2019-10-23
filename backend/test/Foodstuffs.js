var assert = require('assert')
var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var server = require('../src/app')

chai.use(chaiHttp)

describe('Foodstuffs API Routes', function() {

  describe('#indexOf()', function() {

    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })

  })

})