<template>
  <div>
    In child:
    {{ language }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

const ChildComponent = defineComponent({
  setup() {
    const language = inject('language')
    return { language }
  }
})

export default ChildComponent
</script>
