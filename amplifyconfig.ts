import type { ResourcesConfig, AuthUserPoolConfig } from '@aws-amplify/core'

const DomainName = 'd-speedwagon'

const AuthConfig: AuthUserPoolConfig = {
  Cognito: {
    userPoolId: 'ap-northeast-2_MROpxXRM1',
    userPoolClientId: '6ec45praknl9gguv0lsmgqc3i3',
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