import type { ResourcesConfig, AuthUserPoolConfig } from '@aws-amplify/core'

// const DomainName = 'd-speedwagon'
const DomainName = 'kakaoauthtest'

const AuthConfig: AuthUserPoolConfig = {
  Cognito: {
    // userPoolId: 'ap-northeast-2_6voU3H3y5',
    userPoolId: 'ap-northeast-2_Ql6fMPkzw',
    // userPoolClientId: '3iraugrtsm6qo3pifn0lron2rq',
    userPoolClientId: '64n23mmpdnc7qh6rghrqef9l4d',
    loginWith: {
      oauth: {
        domain: `${DomainName}.auth.ap-northeast-2.amazoncognito.com`,
        scopes: ['openid'],
        redirectSignIn: [`${process.env.APP_URL_NO_TRAILING_SLASH}/auth/kakao/callback`],
        redirectSignOut: [process.env.APP_URL_NO_TRAILING_SLASH || 'http://localhost:9000'],
        responseType: 'code',
      },
      username: true,
    },
  },
}

export const AmplifyConfig: ResourcesConfig = {
  Auth: AuthConfig,
}
