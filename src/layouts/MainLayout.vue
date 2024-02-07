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
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'
import { getCurrentUser } from 'src/api/user'
import { hasCurrentUser } from 'src/util/session'

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
    const authStore = storeToRefs(useAuthStore())

    const isHeaderActive = ref(route.path === '/login' ? false : true)
    const menuDrawerOpen = ref(false)

    onMounted(async () => {
      // TODO] current user sync(GET /users/self로 조회)
      // 다른 Layout에서도 hasCurrentUser 체크 해야하지 않나? 해야함. 다른데선 리다이렉트도 해야함
      if (await hasCurrentUser()) {
        const result = await getCurrentUser()
        authStore.user.value = result
      }
    })

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
