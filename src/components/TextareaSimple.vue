<template>
  <q-scroll-area style="width: 500px; height: 100px">
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
