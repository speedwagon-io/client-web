import type { ResourcesConfig, AuthUserPoolConfig } from '@aws-amplify/core'

// const DomainName = 'd-speedwagon'
const DomainName = 'kakaoauthdemodev821343553435'

const AuthConfig: AuthUserPoolConfig = {
  Cognito: {
    // userPoolId: 'ap-northeast-2_6voU3H3y5',
    userPoolId: 'ap-northeast-2_nk8Ccq37i',
    // userPoolClientId: '3iraugrtsm6qo3pifn0lron2rq',
    userPoolClientId: '49ogj0sn3c47gj14caoeo0lr4j',
    loginWith: {
      oauth: {
        domain: `${DomainName}.auth.ap-northeast-2.amazoncognito.com`,
        scopes: ['openid'],
        redirectSignIn: ['http://localhost:9000/auth/kakao/callback'],
        redirectSignOut: ['http://localhost:9000/logout'],
        // responseType: 'code',
        responseType: 'token',
      },
      username: true,
    },
  },
};

export const AmplifyConfig: ResourcesConfig = {
  Auth: AuthConfig,
};