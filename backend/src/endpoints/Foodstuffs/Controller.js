import ApiResponseWrapper from '../../misc/ApiResponseWrapper'
import FoodstuffQueries from '../../queries/Foodstuffs'
import _ from 'lodash'
import { matchedData } from 'express-validator/filter'

var __debug = require('debug')('backend:controllers:formation-session')

const ApiResponse = new ApiResponseWrapper()
const foodstuffQueries = new FoodstuffQueries()

class Foodstuff {

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

    let foodstuff 
    
    try {
      foodstuff = await foodstuffQueries.findById(params.foodstuffId)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res)
    }

    if (foodstuff) {
      ApiResponse.success(req, res, foodstuff)
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
      result = await foodstuffQueries.find(query)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res)
    }

    res.set('X-Total-Count', result.total)

    ApiResponse.success(req, res, result.foodstuffs)
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

    let foodstuff

    try {
      foodstuff = await foodstuffQueries.create(body)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res)
    }

    if (!foodstuff) {
      ApiResponse.badRequest(req, res)
    } else {
      ApiResponse.createSuccess(req, res, foodstuff)
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
      updated = await foodstuffQueries.update(body)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, e)
    }

    if (updated) {
      ApiResponse.success(req, res, updated)
    } else {
      ApiResponse.badRequest(req, res)
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
      deleted = await foodstuffQueries.deleteById(params.foodstuffId)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res)
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
      // deleted = await foodstuffQueries.delete(query)
    } catch (e) {
      console.error(e)
      return ApiResponse.internalError(req, res, e)
    }

    if (deleted) {
      ApiResponse.noContent(req, res)
    } else {
      ApiResponse.badRequest(req, res)
    }
  }

}

module.exports = Foodstuff
