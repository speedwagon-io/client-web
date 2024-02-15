import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'
import { useRoute, useRouter } from 'vue-router'

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth'

export const useUserSession = () => {
  const route = useRoute()
  const router = useRouter()
  const authStore = storeToRefs(useAuthStore())

  const getCurrentSession = async () => {
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
            path: '/login',
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
  }

  return {
    getCurrentSession,
    isAuthenticated,
    logOut,
  }
}
