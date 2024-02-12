<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'
import { getCurrentUser } from 'src/api/user'
import { UserInfo } from 'src/api/user.type'

export default defineComponent({
  name: 'Callback',
  setup() {
    const router = useRouter()
    const authStore = storeToRefs(useAuthStore())

    const routeAfterLogin = (user: UserInfo) => {
      // TODO] redirect_url query param으로 적절한 곳으로 리다이렉트
      if (user.terms_and_marketing_agreement.subscribe_to_marketing) {
        router.push('/')
      } else {
        router.push('/register/policy?method=kakao')
        return
      }
    }

    onMounted(async () => {
      const result = await getCurrentUser()
      authStore.user.value = result
      routeAfterLogin(result)
    })
  },
})
</script>
