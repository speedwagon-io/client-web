<template>
  <q-drawer side="right" overlay behavior="mobile">
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

import { useUserSession } from 'src/composition/useUserSession'

import EssentialLink from 'components/EssentialLink.vue'
import LightDarkToggle from 'components/input/LightDarkToggle.vue'

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
    to: '/auth/login',
  },
]

export default defineComponent({
  name: 'DesktopMenuDrawer',
  components: {
    EssentialLink,
    LightDarkToggle,
  },
  setup() {
    const { logOut } = useUserSession()

    const handleSignOut = async () => {
      await logOut()
    }

    return { menuDrawerLinks: menuDrawerList, handleSignOut }
  },
})
</script>
