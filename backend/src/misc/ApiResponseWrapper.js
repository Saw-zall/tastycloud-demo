import {
  codes
} from './Constants'

import errors from './Errors'

class ApiResponseWrapper {
  success (req, res, data) {
    let status = codes.OK
    res.status(status).json(data)
  }

  createSuccess (req, res, data) {
    let status = codes.CREATED
    res.status(status).json(data)
  }

  noContent (req, res) {
    let status = codes.NO_CONTENT
    res.status(status).send()
  }

  notFound (req, res, errorName) {
    let status = codes.NOT_FOUND
    let error = errors[errorName]
    res.status(status).send(error)
  }

  validatorException (req, res, validationErrors) {
    let status = codes.UNPROCESSABLE_ENTITY
    let err = {
      ...errors.UNPROCESSABLE_ENTITY,
      errors: validationErrors
    }
    res.status(status).json(err)
  }

  badRequest (req, res, errorName) {
    let status = codes.BAD_REQUEST
    try {
      let error = errors[errorName]
      res.status(status).send(error)
    } catch (e) {
      res.status(status).send()
    }
  }

  internalError (req, res, errorName) {
    let status = codes.INTERNAL_SERVER_ERROR
    try {
      let error = errors[errorName]
      res.status(status).send(error)
    } catch (e) {
      res.status(status).send()
    }
  }
}

module.exports = ApiResponseWrapper