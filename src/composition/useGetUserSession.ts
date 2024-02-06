import { useRouter } from 'vue-router'

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession } from 'aws-amplify/auth'

interface AuthSession {
  idToken: string
  sub: string
}

interface CurrentUser extends AuthSession {
  username: string
}

export const useGetUserSession = () => {
  const router = useRouter()

  const getCurrentSession = async (): Promise<CurrentUser> => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {}
      const idTokenString = idToken?.toString()
      if (idTokenString) {
        return {
          idToken: idTokenString,
          sub: idToken?.payload.sub || '',
          username: idToken?.payload['cognito:username'] as string,
        }
      }
    } catch (error: any) {
      if (error.name === 'UserUnAuthenticatedException') {
        router.push('/login')
      }
    }
    return { idToken: '', sub: '', username: '' }
  }

  return {
    getCurrentSession,
  }
}
