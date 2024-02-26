<template>
  <div class="container row flex-center">
    <q-spinner color="accent" size="3em" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'

import { getCurrentUser } from 'src/api/user'
import { UserInfo } from 'src/api/user.type'
import { popFromUrlSearchParam } from 'src/util/routeParser'

import { Hub } from 'aws-amplify/utils'

export default defineComponent({
  name: 'Callback',
  setup() {
    const router = useRouter()
    const authStore = storeToRefs(useAuthStore())

    let redirect_url = ''

    const routeAfterLogin = (user: UserInfo) => {
      if (user.terms_and_marketing_agreement.policy_and_terms) {
        const url = new URL(window.location.origin + redirect_url)
        router.push({
          path: url.pathname || '/',
          state: {
            mode: popFromUrlSearchParam(url.searchParams, 'mode'),
          },
          query: Object.fromEntries(url.searchParams),
        })
      } else {
        router.push({
          path: '/auth/register/policy',
          query: { method: 'kakao' },
          state: { redirect_url: redirect_url },
        })
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

<style lang="scss" scoped>
.container {
  height: calc(100vh - 30vh);
}
</style>
