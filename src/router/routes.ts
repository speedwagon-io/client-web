import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/index', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      {
        path: '/auth/kakao/callback',
        component: () => import('pages/Callback.vue'),
      },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue'),
    children: [
      { path: 'policy', component: () => import('pages/PolicyAgreement.vue') },
      {
        path: 'policy/detail',
        component: () => import('pages/PolicyDetail.vue'),
      },
      { path: 'email', component: () => import('pages/EmailRegister.vue') },
      {
        path: 'email/verify',
        component: () => import('pages/VerifyEmail.vue'),
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
