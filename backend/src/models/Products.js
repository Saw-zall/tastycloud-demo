import { Model } from 'objection'

class Product extends Model {
  static get tableName() {
    return 'products'
  }

  static get relationMappings() {
    const Foodstuffs = require('./Foodstuffs')
    return {
      foodstuffs: {
        relation: Model.ManyToManyRelation,
        modelClass: Foodstuffs,
        join: {
          from: 'products.id',
          through: {
            from: 'foodstuffs_products.product_id',
            to: 'foodstuffs_products.foodstuff_id'
          },
          to: 'foodstuffs.id'
        }
      }
    }
  }
}


module.exports = Product