<template>
  <q-page padding>
    <AnswerMode
      v-if="modeStore.user.value === 'answer' && authStore.user.value"
    />
    <QueryMode v-else />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useModeStore } from 'src/stores/mode'
import { useAuthStore } from 'src/stores/auth'

import AnswerMode from 'pages/home/AnswerMode.vue'
import QueryMode from 'pages/home/QueryMode.vue'

export default defineComponent({
  name: 'Home',
  components: { AnswerMode, QueryMode },
  setup() {
    const modeStore = storeToRefs(useModeStore())
    const authStore = storeToRefs(useAuthStore())

    // INFO] 답변자모드 변경 > 로그인 이후 Home으로 리다이렉트시 mode세팅
    modeStore.user.value = !authStore.user.value ? 'query' : history.state.mode

    return {
      modeStore,
      authStore,
    }
  },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
