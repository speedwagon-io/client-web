<template>
  <q-layout view="lHh lpR lFf">
    <transition name="slide_up" v-show="isHeaderActive">
      <q-header elevated>
        <HeaderBar @toggle-menu-drawer="toggleMenuDrawer" />
      </q-header>
    </transition>

    <LeftMenuDrawer v-if="!isMobile" v-model="menuDrawerOpen" />
    <RightMenuDrawer
      v-else
      v-model="menuDrawerOpen"
      @close-menu-drawer="closeMenuDrawer"
    />

    <q-page-container style="padding-top: 50px">
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
import LeftMenuDrawer from 'components/drawer/LeftMenuDrawer.vue'
import RightMenuDrawer from 'components/drawer/RightMenuDrawer.vue'
import SwipeableBottomDrawer from 'components/drawer/SwipeableBottomDrawer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    SwipeableBottomDrawer,
    HeaderBar,
    LeftMenuDrawer,
    RightMenuDrawer,
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
