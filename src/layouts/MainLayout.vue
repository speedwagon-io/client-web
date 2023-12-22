<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          v-if="!isMobile"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img src="../assets/speedwagon_logo.png" class="logo" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!isMobile"
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      bordered
    >
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in leftDrawerLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="isMobile" class="bg-grey-4 text-white">
      <q-toolbar>
        <q-space />

        <q-btn-toggle
          v-model="menu"
          flat
          stretch
          :options="navbarMenus"
        />

        <q-space />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useQuasar } from 'quasar'

import EssentialLink from 'components/EssentialLink.vue'

const leftDrawerList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
]

const navbarMenus = [
  { label: '질문하기', value: 'query', icon: 'home' },
  { label: '질문/답변', value: 'myQna', icon: 'question_answer' },
  { label: '질문목록', value: 'queryList', icon: 'list' },
  { label: '마이페이지', value: 'myPage', icon: 'account_circle' },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    const quasar = useQuasar()
    const isMobile = computed(() => {
      return quasar.screen.lt.md ? true : false
    })

    return {
      menu: ref('query'),
      navbarMenus,
      leftDrawerOpen,
      leftDrawerLinks: leftDrawerList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isMobile,
    }
  },
})
</script>

<style lang="scss">
.logo {
  width: 100px;
}
</style>
