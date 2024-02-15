<template>
  <div class="q-pa-sm full-width">
    <q-linear-progress :value="progress" color="accent" size="lg" />
    <img class="logo" src="/src/assets/progress_logo.svg" alt="">
    <div>답변자 찾는중</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'QnAProgress',
  setup() {
    const progress = ref(0)

    onMounted(() => {
      progress.value = 0.3
    })

    return {
      progress,
      color: '',
    }
  },
})
</script>

<style lang="scss" scoped>
.q-linear-progress {
  overflow: visible;

  // &:deep(.q-linear-progress__model)::after {
  //   content: url("src/assets/progress_logo.svg");
  //   display: inline-block;
  //   margin-right: -100%;
  // }
}

.logo {
  // width: 36px;
  // height: auto;
}
</style>