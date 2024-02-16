<template>
  <div class="q-pa-sm full-width">
    <QLinearProgress
      ref="linearProgress"
      rounded
      :value="progress"
      color="accent"
      size="lg"
    >
      <img src="/src/assets/progress_logo.svg" alt="" />
    </QLinearProgress>
    <img class="logo" ref="logo" src="/src/assets/progress_logo.svg" alt="" />
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
    const linearProgress = ref()
    const logo = ref()
    const progress = ref(0)

    const relocateLogoElement = () => {
      linearProgress.value?.$el.childNodes[1].appendChild(logo.value)
    }

    onMounted(() => {
      relocateLogoElement()
      progress.value = 0.3
    })

    return {
      progress,
      linearProgress,
      logo,
    }
  },
})
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  right: -20px;
  top: -10px;
  z-index: 3;
}
</style>
