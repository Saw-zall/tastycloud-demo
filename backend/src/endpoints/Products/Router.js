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
  .put(
    updateValidator,
    rejectOnBadParameter,
    ProductController.putOne
  )
  .delete(
    searchValidator,
    rejectOnBadParameter,
    ProductController.deleteAll
  )

router.route('/:productId')
  .get(
    resourceIdValidator,
    rejectOnBadParameter,
    ProductController.getOne
  )
  .delete(
    resourceIdValidator,
    rejectOnBadParameter,
    ProductController.deleteOne
  )

module.exports = router
