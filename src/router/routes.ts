import { RouteRecordRaw } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useModeStore } from 'src/stores/mode'
import { useAuthStore } from 'src/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: async () => {
          const authStore = storeToRefs(useAuthStore())
          const modeStore = storeToRefs(useModeStore())
          switch (modeStore.user.value) {
            case 'query':
              return import('pages/home/QModeHome.vue')
            case 'answer':
              if (authStore.user.value) {
                modeStore.user.value = 'query'
                return import('pages/home/QModeHome.vue')
              } else {
                return import('pages/home/AModeHome.vue')
              }
            default:
              return import('pages/home/QModeHome.vue')
          }
        },
      },
      { path: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/auth/Login.vue') },
      {
        path: 'auth/kakao/callback',
        component: () => import('pages/auth/Callback.vue'),
      },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue'),
    children: [
      {
        path: 'policy',
        component: () => import('pages/auth/PolicyAgreement.vue'),
      },
      {
        path: 'policy/detail',
        component: () => import('pages/auth/PolicyDetail.vue'),
      },
      {
        path: 'email',
        component: () => import('pages/auth/EmailRegister.vue'),
      },
      {
        path: 'email/verify',
        component: () => import('pages/auth/VerifyEmail.vue'),
      },
      {
        path: 'reset_password',
        component: () => import('pages/auth/ResetPassword.vue'),
      },
    ],
  },
  {
    path: '/next',
    component: () => import('layouts/ToNextLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/auth/BackToLogin.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
