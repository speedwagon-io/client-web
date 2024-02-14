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

import { Hub } from 'aws-amplify/utils'

export default defineComponent({
  name: 'Callback',
  setup() {
    const router = useRouter()
    const authStore = storeToRefs(useAuthStore())

    let redirect_url = ''

    const routeAfterLogin = (user: UserInfo) => {
      if (user.terms_and_marketing_agreement.subscribe_to_marketing) {
        router.push(redirect_url || '/')
      } else {
        router.push(
          `/register/policy?method=kakao&redirect_url=${redirect_url}`,
        )
      }
    }

    onMounted(async () => {
      Hub.listen('auth', async ({ payload }) => {
        switch (payload.event) {
          case 'signInWithRedirect':
            const result = await getCurrentUser()
            authStore.user.value = result
            routeAfterLogin(result)
            break
          case 'signInWithRedirect_failure':
            console.error('signInWithRedirect_failure')
            break
          case 'customOAuthState':
            redirect_url = payload.data
            break
        }
      })
    })
  },
})
</script>
