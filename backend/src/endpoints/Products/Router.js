import express from 'express'
import Product from './Controller'

import {
  rejectOnBadParameter
} from '../../misc/tools'

import {
  searchValidator,
  resourceIdValidator,
  createValidator,
  updateValidator,
} from './validator'

const ProductController = new Product()

const router = express.Router({
  mergeParams: true
});

/**
 * Routes
 */
router.route('/')
  .get(
    searchValidator,
    rejectOnBadParameter,
    ProductController.getAll
  )
  .post(
    createValidator,
    rejectOnBadParameter,
    ProductController.create
  )
  .delete(
    searchValidator,
    rejectOnBadParameter,
    ProductController.deleteAll
  )

// router.param('productId', ControlResourceAccess('product'))

router.route('/:productId')
  .get(
    resourceIdValidator,
    rejectOnBadParameter,
    ProductController.getOne
  )
  .put(
    updateValidator,
    rejectOnBadParameter,
    ProductController.putOne
  )
  .delete(
    resourceIdValidator,
    rejectOnBadParameter,
    ProductController.deleteOne
  )

/* *********************** NON REST ENDPOINTS *********************************/

/* ********************* END NON REST ENDPOINTS *******************************/

module.exports = router
