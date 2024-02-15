<template>
  <div class="q-pa-sm full-width">
    <q-linear-progress :value="progress" rounded color="accent" size="lg" />
    <div>답변자 찾는중</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'QnAProgress',
  setup() {
    const progress = ref(0.3)

    return {
      progress,
      color: ''
    }
  },
})
</script>

<style lang="scss" scoped>
</style>