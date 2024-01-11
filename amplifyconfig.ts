import type { ResourcesConfig, AuthUserPoolConfig } from '@aws-amplify/core'

const AuthConfig: AuthUserPoolConfig = {
  Cognito: {
    userPoolId: process.env.COGNITO_USERPOOL_ID || '',
    userPoolClientId: process.env.COGNITO_USERPOOL_CLIENT_ID || '',
    loginWith: {
      oauth: {
        domain: `${process.env.COGNITO_DOMAIN}.auth.ap-northeast-2.amazoncognito.com`,
        scopes: ['openid'],
        redirectSignIn: [
          `${process.env.APP_URL_NO_TRAILING_SLASH}/auth/kakao/callback`,
        ],
        redirectSignOut: [
          process.env.APP_URL_NO_TRAILING_SLASH || 'http://localhost:9000',
        ],
        responseType: 'code',
      },
      username: true,
    },
  },
}

export const AmplifyConfig: ResourcesConfig = {
  Auth: AuthConfig,
}
