import { useRouter } from 'vue-router'

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession } from 'aws-amplify/auth'

export const getCurrentSession = async () => {
  const router = useRouter()

  try {
    const { idToken } = (await fetchAuthSession()).tokens ?? {}
    const idTokenString = idToken?.toString()
    return { idTokenDecoded: idToken, idTokenString }
  } catch (error: any) {
    if (error.name === 'UserUnAuthenticatedException') {
      router.push('/login')
    }
  }
  return { idTokenDecoded: {}, idTokenString: '' }
}