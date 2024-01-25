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
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

const getCurrentSession = async (): Promise<string> => {
  const { accessToken } = (await fetchAuthSession()).tokens ?? {};
  console.log(accessToken)
  const accessTokenString = accessToken?.toString()
  if (accessTokenString) {
    return accessTokenString
  }
  return ''
}

export default defineComponent({
  name: 'Callback',
  setup() {
    const router = useRouter()
    const authStore = storeToRefs(useAuthStore())

    const routeAfterLogin = () => {
      // TODO] oauth 인증 이후 유저 조회(username? sub?)해서 상태관리(로컬스토리지는?)하고
      // 약관 동의 여부 확인 후 적절한 곳으로 리다이렉트
      router.push('/')
    }

    onMounted(async () => {
      const accessToken = await getCurrentSession()
      if (accessToken) {
        authStore.accessToken.value = accessToken
        routeAfterLogin()
      }
    })
  }
})
</script>
