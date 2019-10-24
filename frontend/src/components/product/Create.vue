<template>
  <q-card class="q-pa-md" style="width: 50%">

    <q-card-section>
      <q-input v-model="product.title" label="Titre"/>
      <q-input v-model="product.description" label="Description"/>
      <q-select
          filled
          v-model="productFoodstuffs"
          multiple
          :options="mappedFoodstuffs"
          map-options
          emit-value
          use-chips
          stack-label
          label="Garnitures"
        />
    </q-card-section>

    <q-card-actions float-right >
      <q-btn label="Sauvegarder" @click="createProduct"></q-btn>
    </q-card-actions>

  </q-card>
</template>

<script>

export default {
  name: 'EditProduct',
  model: {
    prop: 'product',
    event: 'save'
  },
  data () {
    return {
      product: {
        title: '',
        description: '',
        foodstuffs: [],
        price: 10,
        currency: '$'
      },
      cookingOptions: [{
        value: 1,
        label: '11'
      }, {
        value: 2,
        label: '22'
      }, {
        value: 3,
        label: '33'
      }, {
        value: 4,
        label: '44'
      }]
    }
  },
  created () {
  },
  computed: {
    allFoodstuffs () {
      return this.$store.state.foodstuffs.all
    },
    productFoodstuffs: {
      get () {
        return this.product.foodstuffs.map(f => {
          return f.id
        })
      },
      set (value) {
        this.product = {
          ...this.product,
          foodstuffs: value.map(v => {
            return { id: v }
          })
        }
      }
    },
    mappedFoodstuffs () {
      return this.allFoodstuffs.map(f => {
        return ({
          value: f.id,
          label: f.name
        })
      })
    }
  },
  methods: {
    createProduct () {
      this.$axios
        .post('/products', this.product)
        .then(res => {
          this.$store.commit('products/addOne', res.data)
          this.$emit('saved')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
