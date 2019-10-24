<template>
  <q-page class="flex flex-center q-pa-md">
    <h3>Liste des plats</h3>
    <div class="row q-col-gutter-md text-center">

      <div v-for="product in products" :key="product.id" class="col-3">
        <product :product-id="product.id"/>
      </div>

      <div class="col-3" style="height: auto">

        <q-card>
          <q-card-section>
            <div class="text-h6">Ajouter un plat</div>
          </q-card-section>

          <q-card-actions align="around">
            <q-btn flat round color="teal" icon="add" @click="modalCreateOpen = true"/>
          </q-card-actions>
        </q-card>

      </div>

      <q-dialog v-model="modalCreateOpen">
        <create-product
          @saved="modalCreateOpen = false"
        />
      </q-dialog>

    </div>
  </q-page>
</template>

<script>

import Product from '../components/product'
import CreateProduct from '../components/product/Create'

export default {
  name: 'Index',
  components: {
    Product,
    CreateProduct
  },
  data () {
    return {
      productsLoading: false,
      foodstuffsLoading: true,
      modalCreateOpen: true
    }
  },
  mounted () {
    this.fetchProducts()
    this.fetchFoodstuffs()
  },
  created () {

  },
  computed: {
    products: {
      get () {
        return this.$store.state.products.all
      },
      set (value) {
        this.$store.commit('products/addProducts', value)
      }
    }
  },
  methods: {
    fetchProducts () {
      this.productsLoading = true
      this.$axios
        .get('/products')
        .then(res => {
          this.products = res.data
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          this.productsLoading = false
        })
    },
    fetchFoodstuffs () {
      this.foodstuffsLoading = true
      this.$axios
        .get('/foodstuffs')
        .then(res => {
          this.$store.commit('foodstuffs/setFoodstuffs', res.data)
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          this.foodstuffsLoading = false
        })
    }
  }
}
</script>
