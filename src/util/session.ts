import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

export const getCurrentSession = async () => {
  const { idToken } = (await fetchAuthSession()).tokens ?? {}
  const idTokenString = idToken?.toString()
  return { idTokenDecoded: idToken, idTokenString }
}

export const hasCurrentUser = async () => {
  try {
    const result = await getCurrentUser()
    return result ? true : false
  } catch (error: any) {
    if (error.name === 'UserUnAuthenticatedException') {
      return false
    }
  }
}