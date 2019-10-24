import Vue from 'vue'

export function addProducts (state, products) {
  products.forEach(p => {
    Vue.set(state.all, p.id, p)
  })
}

export function updateOne (state, product) {
  Vue.set(state.all, product.id, product)
}

export function addOne (state, product) {
  Vue.set(state.all, product.id, product)
}
