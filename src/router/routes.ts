import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home/Home.vue') },
      { path: 'index', component: () => import('pages/IndexPage.vue') },
      {
        path: 'auth/kakao/callback',
        component: () => import('pages/auth/Callback.vue'),
      },
      {
        path: 'questions/:id',
        name: 'QuestionDetail',
        component: () => import('pages/q&aDetail/QuestionDetail.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/auth/Login.vue'),
      },
      {
        path: 'reset_password',
        component: () => import('pages/auth/ResetPassword.vue'),
      },
      {
        path: 'register/policy',
        component: () => import('pages/auth/PolicyAgreement.vue'),
      },
      {
        path: 'register/policy/detail',
        component: () => import('pages/auth/PolicyDetail.vue'),
      },
      {
        path: 'register/email',
        component: () => import('pages/auth/EmailRegister.vue'),
      },
      {
        path: 'register/email/verify',
        component: () => import('pages/auth/VerifyEmail.vue'),
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
