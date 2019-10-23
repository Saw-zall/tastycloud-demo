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
  .delete(
    searchValidator,
    rejectOnBadParameter,
    FoodstuffController.deleteAll
  )

// router.param('foodstuffId', ControlResourceAccess('foodstuff'))

router.route('/:foodstuffId')
  .get(
    resourceIdValidator,
    rejectOnBadParameter,
    FoodstuffController.getOne
  )
  .put(
    updateValidator,
    rejectOnBadParameter,
    FoodstuffController.putOne
  )
  .delete(
    resourceIdValidator,
    rejectOnBadParameter,
    FoodstuffController.deleteOne
  )

/* *********************** NON REST ENDPOINTS *********************************/

/* ********************* END NON REST ENDPOINTS *******************************/

module.exports = router
