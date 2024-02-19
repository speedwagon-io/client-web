<template>
  <div class="q-pa-sm full-width">
    <QLinearProgress
      rounded
      :value="progress"
      color="accent"
      animationSpeed="1000"
      size="lg"
    >
      <template v-slot:thumb>
        <q-icon class="logo" name="img:src/assets/progress_logo.svg" />
      </template>
    </QLinearProgress>
    <div>답변자 찾는중</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import QLinearProgress from 'components/quasarOverride/linear-progress/QLinearProgress'

export default defineComponent({
  name: 'QnAProgress',
  components: { QLinearProgress },
  setup() {
    const progress = ref(0)

    onMounted(() => {
      progress.value = 0.3
    })

    return {
      progress,
    }
  },
})
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  right: -20px;
  top: -10px;
  width: 36px;
  height: 36px;
}
</style>
