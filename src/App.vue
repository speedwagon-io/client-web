<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import { useUserSession } from './composition/useUserSession'
import { getCurrentUser } from './api/user'

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = storeToRefs(useAuthStore())
    const { isAuthenticated } = useUserSession()

    onMounted(async () => {
      if (await isAuthenticated(null)) {
        const result = await getCurrentUser()
        authStore.user.value = result
      }
    })
  },
})
</script>
