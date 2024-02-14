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
import { defineComponent, ref } from 'vue'

import { useUserSession } from 'src/composition/useUserSession'

export default defineComponent({
  name: 'QnAModeToggle',
  setup() {
    const { isAuthenticated } = useUserSession()

    const mode = ref('query')

    const handleModeClicked = async () => {
      await isAuthenticated('/index')
      console.log(mode.value)
    }

    return { mode, handleModeClicked }
  },
})
</script>
