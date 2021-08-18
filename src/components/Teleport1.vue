<template>
  <div v-if="popupIsVisible">
    <teleport to="body">
      <div class="popup">Teleport example 1: This is inside the popup!</div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const Component = defineComponent({
  setup() {
    return {
      popupIsVisible: ref(true)
    }
  }
})

export default Component
</script>
