import { useRouter } from 'vue-router'

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

interface AuthSession {
  accessToken: string
  sub: string
}

interface CurrentUser extends AuthSession {
  username: string
}

export const useGetUserSession = () => {
  const router = useRouter()

  const getCurrentSession = async (): Promise<CurrentUser> => {
    try {
      const { username } = await getCurrentUser()
      const { accessToken } = (await fetchAuthSession()).tokens ?? {}
      const accessTokenString = accessToken?.toString()
      if (accessTokenString) {
        return {
          accessToken: accessTokenString,
          sub: accessToken?.payload.sub || '',
          username: username,
        }
      }
    } catch (error: any) {
      if (error.name === 'UserUnAuthenticatedException') {
        console.log(router)
        router.push('/login')
      }
    }
    return { accessToken: '', sub: '', username: '' }
  }

  const getAuthSession = async (): Promise<AuthSession> => {
    const { accessToken } = (await fetchAuthSession()).tokens ?? {}
    const accessTokenString = accessToken?.toString()
    if (accessTokenString) {
      return {
        accessToken: accessTokenString,
        sub: accessToken?.payload.sub || '',
      }
    }
    return { accessToken: '', sub: '' }
  }
  
  return {
    getCurrentSession,
    getAuthSession
  }
}
