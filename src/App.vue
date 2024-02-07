<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { hasCurrentUser } from './util/session'
import { getCurrentUser } from './api/user'
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = storeToRefs(useAuthStore())

    onMounted(async () => {
      if (await hasCurrentUser()) {
        const result = await getCurrentUser()
        authStore.user.value = result
      }
    })
  }
})
</script>
