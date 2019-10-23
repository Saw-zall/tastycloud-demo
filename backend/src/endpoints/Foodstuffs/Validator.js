import { check, body, param, query } from 'express-validator/check'

export const searchValidator = [
  query('offset').optional().isInt({ min: 0 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  query('count').optional().isBoolean().toBoolean(),
  query('orderBy').optional(),
  query('sort').optional().isIn(['asc', 'desc'])
]

export const resourceIdValidator = [
  param('foodstuffId').isInt()
]

export const createValidator = [
  body('name').exists().isLength({ min: 1, max: 30 })
]

export const updateValidator = [
  body('id').isInt(),
  body('name').exists().isLength({ min: 1, max: 30 })
]