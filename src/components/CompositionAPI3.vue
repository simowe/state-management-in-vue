<template>
  <div>
    Equivalent component using Composition API separated into function
    <br />
    {{ number }}
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'

const Component = defineComponent({
  setup() {
    return useDoubleNumber(0)
  }
})

function useDoubleNumber(initialValue = 0) {
  const number = ref(initialValue)
  const double = computed(() => number.value * 2)
  const increment = () => (number.value += 1)
  return { number, double, increment }
}

export default Component
</script>
