import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'
import { useModeStore } from 'src/stores/mode'
import { useRouter } from 'vue-router'

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth'

export const useUserSession = () => {
  const router = useRouter()
  const authStore = storeToRefs(useAuthStore())
  const modeStore = storeToRefs(useModeStore())

  const getCurrentSession = async () => {
    // TODO] 토큰 만료시 로그인 화면으로 돌아가도록
    const { idToken } = (await fetchAuthSession()).tokens ?? {}
    const idTokenString = idToken?.toString()
    return { idTokenDecoded: idToken, idTokenString }
  }

  const isAuthenticated = async (redirect_url: string | null) => {
    try {
      const result = await getCurrentUser()
      return result ? true : false
    } catch (error: any) {
      if (error.name === 'UserUnAuthenticatedException') {
        if (redirect_url) {
          router.push({
            path: '/auth/login',
            state: { redirect_url: redirect_url },
          })
        } else {
          return false
        }
      }
    }
  }

  const logOut = async () => {
    await signOut()
    authStore.user.value = undefined
    modeStore.user.value = 'query'
  }

  return {
    getCurrentSession,
    isAuthenticated,
    logOut,
  }
}
