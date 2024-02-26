<template>
  <q-page padding>
    <AnswerMode v-if="modeStore.user.value === 'answer' && isSignedIn" />
    <QueryMode v-if="modeStore.user.value === 'query'" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useModeStore } from 'src/stores/mode'

import AnswerMode from 'pages/home/AnswerMode.vue'
import QueryMode from 'pages/home/QueryMode.vue'

import { useUserSession } from 'src/composition/useUserSession'

export default defineComponent({
  name: 'Home',
  components: { AnswerMode, QueryMode },
  setup() {
    const modeStore = storeToRefs(useModeStore())
    const { isAuthenticated } = useUserSession()

    const isSignedIn = ref(false)

    onMounted(async () => {
      isSignedIn.value = (await isAuthenticated(null)) as boolean
    })

    return {
      modeStore,
      isSignedIn,
    }
  },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
