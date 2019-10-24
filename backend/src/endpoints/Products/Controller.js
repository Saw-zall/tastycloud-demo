import ApiResponseWrapper from '../../misc/ApiResponseWrapper'
import ProductQueries from '../../queries/Products'
import _ from 'lodash'
import { matchedData } from 'express-validator/filter'

var __debug = require('debug')('backend:controllers:formation-session')

const ApiResponse = new ApiResponseWrapper()
const productQueries = new ProductQueries()

class Product {

  /**
   * Returns one document identified by id
   * @param  {Object}  req Express req
   * @param  {Object}  res Express res
   * @return {Promise}     Json response
   */
  async getOne(req, res) {

    const params = matchedData(req, {
      locations: ['params'],
      includeOptionals: false,
      onlyValidData: true
    })

    let product 
    
    try {
      product = await productQueries.findById(params.productId)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, 'DEFAULT_ERROR')
    }

    if (product) {
      ApiResponse.success(req, res, product)
    } else {
      ApiResponse.notFound(req, res)
    }
  }

  /**
   * Returns all documents
   * @param  {Object}  req Express req
   * @param  {Object}  res Express res
   * @return {Promise}     Json response
   */
  async getAll(req, res) {
    __debug('getAll')

    const query = matchedData(req, {
      locations: ['query'],
      includeOptionals: false,
      onlyValidData: true
    })

    let result

    try {
      result = await productQueries.find(query)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, 'DEFAULT_ERROR')
    }

    res.set('X-Total-Count', result.total)

    ApiResponse.success(req, res, result.products)
  }

  /**
   * Create a new document
   * @param  {Object}  req Express req
   * @param  {Object}  res Express res
   * @return {Promise}     Json response
   */
  async create(req, res) {

    const body = matchedData(req, {
      locations: ['body'],
      includeOptionals: false,
      onlyValidData: true
    })

    let product

    try {
      product = await productQueries.create(body)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, 'DEFAULT_ERROR')
    }

    if (!product) {
      ApiResponse.badRequest(req, res, 'DEFAULT_ERROR')
    } else {
      ApiResponse.createSuccess(req, res, product)
    }
  }

  /**
   * Update a document
   * @param  {Object}  req Express req
   * @param  {Object}  res Express res
   * @return {Promise}     Json response
   */
  async putOne(req, res) {

    const body = matchedData(req, {
      locations: ['body'],
      includeOptionals: false,
      onlyValidData: true
    })

    let updated

    try {
      updated = await productQueries.update(body)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, 'DEFAULT_ERROR')
    }

    if (updated) {
      ApiResponse.success(req, res, updated)
    } else {
      ApiResponse.badRequest(req, res, 'DEFAULT_ERROR')
    }
  }

  /**
   * Delete one document
   * @param  {Object}  req Express req
   * @param  {Object}  res Express res
   * @return {Promise}     Json response
   */
  async deleteOne(req, res) {

    const params = matchedData(req, {
      locations: ['params'],
      includeOptionals: false,
      onlyValidData: true
    })

    let deleted

    try {
      deleted = await productQueries.deleteById(params.productId)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, 'DEFAULT_ERROR')
    }

    if (!deleted) {
      ApiResponse.notFound(req, res)
    } else {
      ApiResponse.success(req, res)
    }
  }

  /**
   * Delete all documents
   * @param  {Object}  req Express req
   * @param  {Object}  res Express res
   * @return {Promise}     Json response
   */
  async deleteAll(req, res) {

    const params = matchedData(req, {
      locations: ['params', 'query'],
      includeOptionals: true,
      onlyValidData: false
    })

    let deleted

    try {
      // deleted = await productQueries.delete(query)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, 'DEFAULT_ERROR')
    }

    if (deleted) {
      ApiResponse.noContent(req, res)
    } else {
      ApiResponse.badRequest(req, res, 'DEFAULT_ERROR')
    }
  }
  
}

module.exports = Product
