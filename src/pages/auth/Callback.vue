<template>
  <div>callback page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'
import { getCurrentUser } from 'src/api/user'

export default defineComponent({
  name: 'Callback',
  setup() {
    const router = useRouter()
    const authStore = storeToRefs(useAuthStore())

    const routeAfterLogin = () => {
      // TODO] 약관 동의 여부 확인 후 적절한 곳으로 리다이렉트
      router.push('/')
    }

    onMounted(async () => {
      const result = await getCurrentUser()
      authStore.user.value = result
      routeAfterLogin()
    })
  },
})
</script>
