import Foodstuff from '../models/Foodstuffs'

var __debug = require('debug')('backend:queries:foodstuffs')

export default class FoodstuffsQueries {

  findById (id) {
    __debug('findById')
    
    return Foodstuff
      .query()
      .where({ id })
      .first()
  }

  async find ({
    offset = 0, 
    limit = 50, 
    orderBy = 'id', 
    sort = 'desc'
  }) {
    __debug('find') 

    const query = Foodstuff
      .query()

    const [ foodstuffs, total ] = await Promise.all([
      query.limit(limit).offset(offset).orderBy(orderBy, sort),
      query.resultSize()
    ])

    return ({ foodstuffs, total })
  }

  create (payload) {
    __debug('create')

    return Foodstuff
      .query()
      .insertGraph(
        payload, 
        { relate: true }
      )
  }

  update (payload) {
    __debug('update')

    return Foodstuff
      .query()
      .upsertGraph(
        payload,
        { relate: true, unrelate: true }
      )
  }

  deleteById (id) {
    __debug('deleteById')

    return Foodstuff
      .query()
      .delete()
      .where({ id })
  }

  delete ({ offset, limit }) {
    __debug('delete')
    // not implemented yet
    return Promise.reject('Not implemented yet')
  }
}