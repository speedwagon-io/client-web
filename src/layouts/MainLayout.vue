<template>
  <q-layout view="lHh lpR lFf">
    <transition name="slide_up" v-show="isHeaderActive">
      <q-header elevated>
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

    <q-page-container style="padding-top: 50px">
      <router-view />
    </q-page-container>

    <transition name="slide_down" v-show="isHeaderActive">
      <q-footer v-if="isMobile" class="bg-grey-4 text-white">
        <q-toolbar>
          <q-space />

          <q-btn-toggle v-model="menu" flat stretch :options="navbarMenus" />

          <q-space />
        </q-toolbar>
      </q-footer>
    </transition>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

import EssentialLink from 'components/EssentialLink.vue'

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
    const route = useRoute()

    const isHeaderActive = ref(route.path === '/login' ? false : true)
    const leftDrawerOpen = ref(false)

    watch(
      () => route.path,
      (change: string) => {
        if (change === '/login') {
          isHeaderActive.value = false
        } else {
          isHeaderActive.value = true
        }
      },
    )

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
    }
  },
})
</script>

<style lang="scss" scoped>
.slide_up-enter-active,
.slide_up-leave-active {
  transition: transform 0.2s ease;
}

.slide_up-enter,
.slide_up-leave-to {
  transform: translateY(-100%);
  transition: all 150ms ease-in 0s;
}

.slide_down-enter-active,
.slide_down-leave-active {
  transition: transform 0.2s ease;
}

.slide_down-enter,
.slide_down-leave-to {
  transform: translateY(100%);
  transition: all 150ms ease-in 0s;
}

.logo {
  width: 100px;
}
</style>
