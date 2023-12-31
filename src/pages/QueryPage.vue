<template>
  <q-page padding>
    <TextareaSimple> title="TextareaSimple" ></TextareaSimple>
  </q-page>
</template>

<script lang="ts">
import TextareaSimple from 'components/TextareaSimple.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'QueryPage',
  components: { TextareaSimple },
  setup() {
    return { text: ref('') }
  },
})
</script>
