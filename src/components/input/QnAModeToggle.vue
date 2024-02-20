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
import { defineComponent, onMounted } from 'vue'

import { useUserSession } from 'src/composition/useUserSession'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useModeStore } from 'src/stores/mode'

import { makeFullPath } from 'src/util/routeParser'
import { useWatchRoute } from 'src/composition/useWatchRoute'

export default defineComponent({
  name: 'QnAModeToggle',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const modeStore = storeToRefs(useModeStore())
    const { isAuthenticated } = useUserSession()
    const { watchRouteQueryParam } = useWatchRoute()

    onMounted(async () => {
      if (!(await isAuthenticated(null)) && modeStore.user.value === 'answer') {
        modeStore.user.value = 'query'
      }
      console.log('QnAModeToggle1:', modeStore.user.value)
      await watchRouteQueryParam('mode', modeStore.user)
      console.log('QnAModeToggle2:', modeStore.user.value)
    })

    const handleModeClicked = async () => {
      // TODO] 홈으로 보내고 리프레시가 맞나?
      if (modeStore.user.value === 'query') {
        router.push('/').then(() => {
          router.go(0)
        })
      } else {
        // TODO] 답변자 온보딩
        if (await isAuthenticated(makeFullPath(route, { mode: 'answer' }))) {
          router.push('/').then(() => {
            router.go(0)
          })
        } else {
          modeStore.user.value = 'query'
        }
      }
    }

    return { modeStore, handleModeClicked }
  },
})
</script>
