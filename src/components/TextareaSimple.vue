<template>
  <q-scroll-area class="scroll-area">
    <q-input v-model="text" filled autogrow />
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TextareaSimple',
  setup() {
    return { text: ref('') }
  },
})
</script>

<style lang="scss" scoped>
.scroll-area {
  width: 300px;
  height: 100px;
}
</style>
