<template>
  <div>
    Traditional component using Options API
    <br />
    {{ number }}
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      number: 0
    }
  },
  computed: {
    double(): number {
      return this.number * 2
    }
  },
  methods: {
    increment() {
      this.number += 1
    }
  }
})

export default Component
</script>
