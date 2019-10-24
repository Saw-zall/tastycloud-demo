import express from 'express'
import Foodstuff from './Controller'

import {
  rejectOnBadParameter
} from '../../misc/tools'

import {
  searchValidator,
  resourceIdValidator,
  createValidator,
  updateValidator,
} from './validator'

const FoodstuffController = new Foodstuff()

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
    FoodstuffController.getAll
  )
  .post(
    createValidator,
    rejectOnBadParameter,
    FoodstuffController.create
  )
  .put(
    updateValidator,
    rejectOnBadParameter,
    FoodstuffController.putOne
  )
  .delete(
    searchValidator,
    rejectOnBadParameter,
    FoodstuffController.deleteAll
  )

router.route('/:foodstuffId')
  .get(
    resourceIdValidator,
    rejectOnBadParameter,
    FoodstuffController.getOne
  )
  .delete(
    resourceIdValidator,
    rejectOnBadParameter,
    FoodstuffController.deleteOne
  )

module.exports = router
