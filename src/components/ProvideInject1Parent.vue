<template>
  <div>
    Provide/Inject example
    <br />
    <ChildComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import ChildComponent from './ProvideInject1Child.vue'

const ParentComponent = defineComponent({
  components: { ChildComponent },
  setup() {
    provide('language', 'en-GB')
  }
})

export default ParentComponent
</script>
