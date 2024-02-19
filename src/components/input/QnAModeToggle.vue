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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'QnAModeToggle',
  setup() {
    const router = useRouter()
    // const { isAuthenticated } = useUserSession()

    const mode = ref('query')

    onMounted(() => {
      const userMode = localStorage.getItem('userMode')
      mode.value = userMode || 'query'
    })

    const handleModeClicked = async () => {
      localStorage.setItem('userMode', mode.value)
      router.push('/').then(() => {
        router.go(0)
      })
    }

    return { mode, handleModeClicked }
  },
})
</script>
