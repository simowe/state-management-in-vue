<template>
  <div>
    Equivalent component using Composition API
    <br />
    {{ number }}
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'

const Component = defineComponent({
  setup() {
    const number = ref(0)
    const double = computed(() => number.value * 2)
    const increment = () => (number.value += 1)
    return { number, double, increment }
  }
})

export default Component
</script>
