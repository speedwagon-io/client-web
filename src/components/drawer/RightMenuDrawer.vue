<template>
  <q-drawer side="right" behavior="mobile" :width="screenWidth">
    <q-toolbar class="justify-between">
      <span>바로가기</span>
      <div>
        <q-icon name="settings" size="lg" />
        <q-icon name="close" size="lg" @click="closeMenuDrawer()" />
      </div>
    </q-toolbar>
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
import { useQuasar } from 'quasar'

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
  emits: ['close-menu-drawer'],
  setup(props, { emit }) {
    const quasar = useQuasar()

    return {
      menuDrawerLinks: menuDrawerList,
      closeMenuDrawer() {
        emit('close-menu-drawer')
      },
      screenWidth: quasar.screen.width,
    }
  },
})
</script>
