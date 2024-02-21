<template>
  <div class="q-pa-sm q-ma-sm bg-dark rounded-borders full-width">
    <QLinearProgress
      class="q-my-sm"
      rounded
      :value="progress"
      color="accent"
      animationSpeed="1000"
      size="lg"
    >
      <template v-slot:thumb>
        <q-icon class="logo" size="lg">
          <img src="~assets/progress_logo.svg" alt="progress_logo" />
        </q-icon>
      </template>
    </QLinearProgress>
    <div class="text-grey-4">답변자 찾는중</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import QLinearProgress from 'components/quasarOverride/linear-progress/QLinearProgress'

export default defineComponent({
  name: 'QnAProgress',
  components: { QLinearProgress },
  props: {
    progressValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const progress = ref(0)

    onMounted(() => {
      progress.value = props.progressValue
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
  top: -12px;
}
</style>
