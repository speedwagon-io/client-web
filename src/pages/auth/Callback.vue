<template>
  <div>callback page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession } from 'aws-amplify/auth'

export default defineComponent({
  name: 'Callback',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const auth = storeToRefs(authStore)

    onMounted(async () => {
      const { accessToken } = (await fetchAuthSession()).tokens ?? {};
      const accessTokenString = accessToken?.toString()
      if (accessTokenString) {
        auth.accessToken.value = accessTokenString
        router.push('/')
      }
    })
  }
})
</script>
