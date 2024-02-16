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
        <img class="logo" src="/src/assets/progress_logo.svg" alt="" />
      </template>
    </QLinearProgress>
    <div>답변자 찾는중</div>
  </div>
</template>

<script lang="ts">
import QLinearProgress from 'components/quasarOverride/linear-progress/QLinearProgress'
import { defineComponent, onMounted, ref } from 'vue'

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
}
</style>
