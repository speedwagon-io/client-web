<template>
  <q-btn-toggle
    v-model="modeStore.user.value"
    class="q-pa-sm"
    no-caps
    rounded
    unelevated
    color="grey-2"
    text-color="grey-5"
    @click="handleModeClicked"
    :options="[
      { label: '질문자모드', value: 'query' },
      { label: '답변자모드', value: 'answer' },
    ]"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useModeStore } from 'src/stores/mode'
import { useAuthStore } from 'src/stores/auth'

import { useUserSession } from 'src/composition/useUserSession'

export default defineComponent({
  name: 'QnAModeToggle',
  setup() {
    const { isAuthenticated } = useUserSession()
    const modeStore = storeToRefs(useModeStore())
    const authStore = storeToRefs(useAuthStore())
    const route = useRoute()

    const handleModeClicked = async () => {
      // TODO] 답변자 온보딩
      if (modeStore.user.value === 'answer') {
        await isAuthenticated(route.fullPath)
      }

      if (!authStore.user.value) {
        modeStore.user.value = 'query'
      }
    }

    return { modeStore, authStore, handleModeClicked }
  },
})
</script>
