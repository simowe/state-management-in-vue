<template>
  <div>
    Global state!
    <br />
    Is logged in?: {{ isLoggedIn }}
    <br />
    Username: {{ loggedInUser?.username }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isLoggedIn, loggedInUser, login } from '../utils/userLogin'

const Component = defineComponent({
  setup() {
    login()
    return { loggedInUser, isLoggedIn }
  }
})

export default Component
</script>
