<template>
  <div>
    SWR Example 3
    <div v-if="error">Didn't work</div>
    <div v-else-if="!product">Loading</div>
    <div v-else>{{ product.productName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useProduct } from '../utils/useProduct'

const Component = defineComponent({
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { productId } = toRefs(props)
    return useProduct(productId)
  }
})

export default Component
</script>
