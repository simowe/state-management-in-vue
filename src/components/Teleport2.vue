<template>
  <Popup v-if="popupIsVisible">
    Teleport example 2: This is inside the popup!
  </Popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Popup from './Teleport2Popup.vue'

const Component = defineComponent({
  components: { Popup },
  setup() {
    return {
      popupIsVisible: ref(true)
    }
  }
})

export default Component
</script>
