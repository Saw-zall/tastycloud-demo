import { validationResult } from 'express-validator/check'
import ApiResponseWrapper from './ApiResponseWrapper'

const ApiResponse = new ApiResponseWrapper()

/**
 * Middleware tool to reject query if malformed
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export function rejectOnBadParameter (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    ApiResponse.validatorException(req, res, errors.array())
  } else {
    next()
  }
}