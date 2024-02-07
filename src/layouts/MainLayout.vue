<template>
  <q-layout view="lHh lpR lFf">
    <transition name="slide_up" v-show="isHeaderActive">
      <q-header>
        <HeaderBar @toggle-menu-drawer="toggleMenuDrawer" />
        <QnAModeToggle />
      </q-header>
    </transition>

    <DesktopMenuDrawer v-if="!isMobile" v-model="menuDrawerOpen" />
    <MobileMenuDrawer
      v-else
      v-model="menuDrawerOpen"
      @close-menu-drawer="closeMenuDrawer"
    />

    <q-page-container style="padding-top: 100px">
      <router-view />
    </q-page-container>

    <transition name="slide_down" v-show="isHeaderActive">
      <div v-if="isMobile">
        <SwipeableBottomDrawer />
      </div>
    </transition>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

import HeaderBar from 'components/header/HeaderBar.vue'
import QnAModeToggle from 'components/input/QnAModeToggle.vue'
import DesktopMenuDrawer from 'components/drawer/DesktopMenuDrawer.vue'
import MobileMenuDrawer from 'components/drawer/MobileMenuDrawer.vue'
import SwipeableBottomDrawer from 'components/drawer/SwipeableBottomDrawer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    SwipeableBottomDrawer,
    HeaderBar,
    DesktopMenuDrawer,
    MobileMenuDrawer,
    QnAModeToggle,
  },

  setup() {
    const quasar = useQuasar()
    const route = useRoute()

    const isHeaderActive = ref(route.path === '/login' ? false : true)
    const menuDrawerOpen = ref(false)

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
      menuDrawerOpen,
      toggleMenuDrawer() {
        menuDrawerOpen.value = !menuDrawerOpen.value
      },
      closeMenuDrawer() {
        menuDrawerOpen.value = false
      },
      isMobile: quasar.platform.is.mobile,
      isHeaderActive,
    }
  },
})
</script>

<style lang="scss" scoped>
.q-header {
  z-index: 1;
}

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
</style>
