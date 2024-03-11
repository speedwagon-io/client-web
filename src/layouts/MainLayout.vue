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
import { useModeStore } from 'src/stores/mode'

import HeaderBar from 'components/header/HeaderBar.vue'
import QnAModeToggle from 'components/input/QnAModeToggle.vue'
import DesktopMenuDrawer from 'components/drawer/DesktopMenuDrawer.vue'
import MobileMenuDrawer from 'components/drawer/MobileMenuDrawer.vue'
import SwipeableBottomDrawer from 'components/drawer/SwipeableBottomDrawer.vue'

import { useUserSession } from 'src/composition/useUserSession'

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
    const modeStore = storeToRefs(useModeStore())
    const { isAuthenticated } = useUserSession()

    const isHeaderActive = ref(route.name === 'QuestionDetail' ? false : true)
    const menuDrawerOpen = ref(false)

    const isSignedIn = ref(false)

    onMounted(async () => {
      isSignedIn.value = (await isAuthenticated(null)) as boolean

      // INFO] 답변자모드 변경 > 로그인 이후 Home으로 리다이렉트시 mode세팅
      if (!isSignedIn.value) {
        modeStore.user.value = 'query'
      } else {
        if (modeStore.user.value === history.state.mode) {
          modeStore.user.value = history.state.mode
        }
      }
    })

    watch(
      () => route.name,
      (change) => {
        if (change === 'QuestionDetail') {
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
      modeStore,
      isSignedIn,
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
