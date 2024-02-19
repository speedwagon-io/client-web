<template>
  <q-btn-toggle
    v-model="mode"
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
import { defineComponent, onMounted, ref } from 'vue'

import { useUserSession } from 'src/composition/useUserSession'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'QnAModeToggle',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { isAuthenticated } = useUserSession()

    const mode = ref('query')

    onMounted(async () => {
      const userMode = localStorage.getItem('userMode')
      if (!(await isAuthenticated(null)) && userMode === 'answer') {
        mode.value = 'query'
        return
      }
      mode.value = userMode || 'query'
    })

    const handleModeClicked = async () => {
      localStorage.setItem('userMode', mode.value)
      // TODO] 홈으로 보내고 리프레시가 맞나?
      if (mode.value === 'query') {
        router.push('/').then(() => {
          router.go(0)
        })
      } else {
        // TODO] 답변자 온보딩
        if (await isAuthenticated(route.fullPath)) {
          router.push('/').then(() => {
            router.go(0)
          })
        } else {
          mode.value = 'query'
        }
      }
    }

    return { mode, handleModeClicked }
  },
})
</script>
