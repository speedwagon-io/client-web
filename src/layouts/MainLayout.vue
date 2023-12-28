<template>
  <q-layout view="lHh lpR lFf">
    <transition name="slide">
      <q-header elevated v-show="isHeaderActive">
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
    </transition>

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
      <button @click="toggleHeader">hide header</button>
    </q-page-container>

    <q-footer v-if="isMobile" class="bg-grey-4 text-white">
      <q-toolbar>
        <q-space />

        <q-btn-toggle v-model="menu" flat stretch :options="navbarMenus" />

        <q-space />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

import EssentialLink from 'components/EssentialLink.vue'
import { menuDisplayStore } from 'src/stores/menu'
import { storeToRefs } from 'pinia'

const leftDrawerList = [
  {
    title: '질문하기',
    caption: '질문하기',
    icon: 'school',
    to: '/query',
  },
]

const navbarMenus = [
  { label: '질문하기', value: 'query', icon: 'home', to: '/query' },
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
    const quasar = useQuasar()
    const store = menuDisplayStore()

    const { isHeaderActive } = storeToRefs(store)
    const { toggleHeader } = store

    const leftDrawerOpen = ref(false)

    return {
      menu: ref(''),
      navbarMenus,
      leftDrawerOpen,
      leftDrawerLinks: leftDrawerList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isMobile: quasar.platform.is.mobile,
      isHeaderActive,
      toggleHeader,
    }
  },
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
  transition: all 150ms ease-in 0s;
}

.logo {
  width: 100px;
}
</style>
