<template>
  <div class="container">
    <CompositionAPI1 />
    <CompositionAPI2 />
    <CompositionAPI3 />
    <ProvideInject1Parent />
    <Teleport1 />
    <Teleport2 />
    <GlobalState />
    <GlobalState />
    <SWR1 />
    <SWR1 />
    <SWR2 />
    <SWR2 />
    <SWR3 :productId="3" />
    <SWR3 :productId="10" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CompositionAPI1 from './components/CompositionAPI1.vue'
import CompositionAPI2 from './components/CompositionAPI2.vue'
import CompositionAPI3 from './components/CompositionAPI3.vue'
import ProvideInject1Parent from './components/ProvideInject1Parent.vue'
import Teleport1 from './components/Teleport1.vue'
import Teleport2 from './components/Teleport2.vue'
import GlobalState from './components/GlobalState.vue'
import SWR1 from './components/SWR1.vue'
import SWR2 from './components/SWR2.vue'
import SWR3 from './components/SWR3.vue'

export default defineComponent({
  components: {
    CompositionAPI1,
    CompositionAPI2,
    CompositionAPI3,
    ProvideInject1Parent,
    Teleport1,
    Teleport2,
    GlobalState,
    SWR1,
    SWR2,
    SWR3
  }
})
</script>

<style lang="css">
body {
  margin: 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
