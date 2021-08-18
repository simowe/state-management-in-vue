<template>
  <div>
    SWR Example 2
    <div v-if="error">Didn't work</div>
    <div v-else-if="!user">Loading</div>
    <div v-else>{{ user.username }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMyUser } from '../utils/useMyUser'

const Component = defineComponent({
  setup() {
    return useMyUser()
  }
})

export default Component
</script>
