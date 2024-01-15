import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/index', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/login/email', component: () => import('pages/EmailLogin.vue')},
      {
        path: '/auth/kakao/callback',
        component: () => import('pages/Callback.vue'),
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
