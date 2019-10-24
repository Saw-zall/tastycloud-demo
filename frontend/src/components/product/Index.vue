<template>
  <div>

    <q-card>
      <q-card-section>
        <div class="text-h6">{{ product.title }}</div>
      </q-card-section>

      <q-card-section>
        {{ product.description }}
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat round color="teal" icon="edit" @click="modalEditOpen = true" />
        <q-btn flat round color="red" icon="delete" @click="deleteProduct"/>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="modalEditOpen">
      <edit-product
        :product-id="productId"
        @saved="modalEditOpen = false"
      />
    </q-dialog>

  </div>
</template>
<script>

import EditProduct from './Edit'

export default {
  name: 'Product',
  components: {
    EditProduct
  },
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      modalEditOpen: false,
      modalCreateOpen: false
    }
  },
  computed: {
    product: {
      get () {
        return this.$store.getters['products/getOne'](this.productId)
      },
      set (value) {
        this.$store.commit('updateOne', value)
      }
    }
  },
  methods: {
    deleteProduct () {
      this.$axios
        .delete(`/products/${this.product.id}`)
        .then(res => {
          this.$store.commit('products/deleteOne', this.product.id)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
