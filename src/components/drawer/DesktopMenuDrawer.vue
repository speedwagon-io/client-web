<template>
  <q-drawer side="right" overlay behavior="mobile" bordered>
    <q-list>
      <q-item-label header> Essential Links </q-item-label>

      <EssentialLink
        v-for="link in menuDrawerLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
    <q-btn @click="handleSignOut">로그아웃</q-btn>
    <LightDarkToggle />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import EssentialLink from 'components/EssentialLink.vue'
import LightDarkToggle from 'components/input/LightDarkToggle.vue'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signOut } from 'aws-amplify/auth'

const menuDrawerList = [
  {
    title: '질문하기',
    caption: '질문하기',
    icon: 'school',
    to: '/query',
  },
  {
    title: '로그인',
    caption: '로그인',
    icon: 'login',
    to: '/login',
  },
]

const handleSignOut = async () => {
  // TODO] pinia user값 비우기
  await signOut()
}

export default defineComponent({
  name: 'DesktopMenuDrawer',
  components: {
    EssentialLink,
    LightDarkToggle,
  },
  setup() {
    return { menuDrawerLinks: menuDrawerList, handleSignOut }
  },
})
</script>
