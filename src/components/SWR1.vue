<template>
  <div>
    SWR Example 1
    <div v-if="error">Didn't work</div>
    <div v-else-if="!user">Loading</div>
    <div v-else>{{ user.username }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSWR } from '@attensi/swr'
import { fetchMyUser } from '../utils/fetchMyUser'

const Component = defineComponent({
  setup() {
    const key = 'myUser' // Used to globally identify the data
    const { data: user, error } = useSWR(key, fetchMyUser)
    return { user, error }
  }
})

export default Component
</script>
