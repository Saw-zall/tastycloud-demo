import Product from '../models/Products'

var __debug = require('debug')('backend:queries:products')

export default class ProductsQueries {

  findById (id) {
    __debug('findById')
    
    return Product
      .query()
      .eager('foodstuffs')
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

    const query = Product
      .query()
      .eager('foodstuffs')

    const [ products, total ] = await Promise.all([
      query.limit(limit).offset(offset).orderBy(orderBy, sort),
      query.resultSize()
    ])

    return ({ products, total })
  }

  create (payload) {
    __debug('create')

    return Product
      .query()
      .insertGraph(
        payload, 
        { relate: true }
      )
  }

  update (payload) {
    __debug('update')

    return Product
      .query()
      .upsertGraph(
        payload,
        { relate: true, unrelate: true }
      )
  }

  deleteById (id) {
    __debug('deleteById')

    return Product
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