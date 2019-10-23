import { Model } from 'objection'

class Product extends Model {
  static get tableName() {
    return 'foodstuffs'
  }

  // static get relationMappings() {
  //   const Products = require('./Products')
  //   return {
  //     products: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Products,
  //       join: {
  //         from: 'foodstuffs.id',
  //         through: {
  //           from: 'foodstuffs_products.foodstuff_id',
  //           to: 'foodstuffs_products.product_id'
  //         },
  //         to: 'products.id'
  //       }
  //     }
  //   }
  // }
}

module.exports = Product