import { check, body, param, query } from 'express-validator/check'

let isFoodstuffsIdsOnly = (array, { req }) => {
  for (const i in array) {
    if (typeof array[i] === 'object') {
      if (!array[i].hasOwnProperty('id')) return (false)
      if (isNaN(Number(array[i].id))) return (false)
    } else {
      return (false)
    }
  }

  return (true)
}

export const searchValidator = [
  query('offset').optional().isInt({ min: 0 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  query('count').optional().isBoolean().toBoolean(),
  query('orderBy').optional(),
  query('sort').optional().isIn(['asc', 'desc'])
]

export const resourceIdValidator = [
  param('productId').isInt()
]

export const createValidator = [
  body('title').exists().isLength({ min: 1, max: 30 }),
  body('description').exists().isLength({ min: 1, max: 500 }),
  body('image').optional({ checkFalsy: true }).isURL(),
  body('cook').optional({ checkFalsy: true }).isIn([1, 2, 3, 4]),
  body('price').exists().isInt({ min: 0 }),
  body('currency').exists().isIn(['€', '$']),
  body('foodstuffs').optional().isArray().custom(isFoodstuffsIdsOnly)
]

export const updateValidator = [
  body('id').isInt(),
  body('title').exists().isLength({ min: 1, max: 30 }),
  body('description').exists().isLength({ min: 1, max: 500 }),
  body('image').optional({ checkFalsy: true }).isURL(),
  body('cook').optional({ checkFalsy: true }).isIn([1, 2, 3, 4]),
  body('price').exists().isInt({ min: 0 }),
  body('currency').exists().isIn(['€', '$']),
  body('foodstuffs').optional().isArray().custom(isFoodstuffsIdsOnly)
]