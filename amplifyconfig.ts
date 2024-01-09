import type { ResourcesConfig, AuthUserPoolConfig } from '@aws-amplify/core'

const DomainName = 'd-speedwagon'

const AuthConfig: AuthUserPoolConfig = {
  Cognito: {
    userPoolId: 'ap-northeast-2_MMMuAGGoV',
    userPoolClientId: 'qhl1sp4o1he39iujlf7md5u97',
    loginWith: {
      oauth: {
        domain: `${DomainName}.auth.ap-northeast-2.amazoncognito.com`,
        scopes: ['openid'],
        redirectSignIn: ['http://localhost:9000/auth/kakao/callback'],
        redirectSignOut: ['http://localhost:9000'],
        responseType: 'token',
      },
      username: true,
    },
  },
};

export const AmplifyConfig: ResourcesConfig = {
  Auth: AuthConfig,
};