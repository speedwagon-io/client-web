import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { fetchAuthSession } from 'aws-amplify/auth'

type TokenAndSub = {
  accessToken: string
  sub: string
}
export const getCurrentSession = async (): Promise<TokenAndSub> => {
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
