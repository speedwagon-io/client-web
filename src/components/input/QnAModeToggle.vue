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
      { label: '답변자모드', value: 'wagon' },
    ]"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { useUserSession } from 'src/composition/useUserSession'
import { useWatchRoute } from 'src/composition/useWatchRoute'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'QnAModeToggle',
  setup() {
    const router = useRouter()
    const { isAuthenticated } = useUserSession()
    const { watchRouteQueryParam } = useWatchRoute()

    const mode = ref('query')

    onMounted(() => {
      watchRouteQueryParam('mode', mode)
    })

    const handleModeClicked = async () => {
      if (mode.value === 'query') {
        router.push('/').then(() => {
          router.go(0)
        })
      } else {
        if (await isAuthenticated('/?mode=wagon')) {
          // TODO] 답변자 온보딩 여부 확인 후 리다이렉트
          router.push('/?mode=wagon')
        } else {
          mode.value = 'query'
          // TODO] 인증 이후 돌아와서 온보딩
        }
      }
    }

    return { mode, handleModeClicked }
  },
})
</script>
