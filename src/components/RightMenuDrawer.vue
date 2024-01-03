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
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import EssentialLink from 'components/EssentialLink.vue'

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

export default defineComponent({
  name: 'RightMenuDrawer',
  components: {
    EssentialLink,
  },
  setup() {
    return { menuDrawerLinks: menuDrawerList }
  },
})
</script>
