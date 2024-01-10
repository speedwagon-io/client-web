<template>
  <q-page padding>
    <TextareaSimple> title="TextareaSimple" ></TextareaSimple>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import TextareaSimple from 'components/TextareaSimple.vue'

export default defineComponent({
  name: 'QueryPage',
  components: { TextareaSimple },
  setup() {
    return { text: ref('') }
  },
})
</script>
