<template>
  <router-view :key="count" />
  <transition name="slide_down">
    <div v-show="isBottomDrawerActive">
      <SwipeableBottomDrawer @re-render-home="raiseKeyCount" />
    </div>
  </transition>
  <Callback style="display: none" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'

import { useUserSession } from './composition/useUserSession'
import { getCurrentUser } from './api/user'

import SwipeableBottomDrawer from 'components/drawer/SwipeableBottomDrawer.vue'
import Callback from 'pages/auth/Callback.vue'

const hideBottomSheetPathPrefix = ['auth', 'next']

export default defineComponent({
  name: 'App',
  components: {
    SwipeableBottomDrawer,
    Callback,
  },
  setup() {
    const route = useRoute()
    const authStore = storeToRefs(useAuthStore())
    const { isAuthenticated } = useUserSession()

    const isBottomDrawerActive = ref(true)
    const count = ref(0)

    watch(
      () => route.path,
      change => {
        if (hideBottomSheetPathPrefix.some(v => change.includes(v))) {
          isBottomDrawerActive.value = false
        } else {
          isBottomDrawerActive.value = true
        }
      },
    )

    onMounted(async () => {
      // TODO] oauth 이후 callback에서 넘어올때 GET /users/self 한번 더 호출함
      if (await isAuthenticated(null)) {
        const result = await getCurrentUser()
        authStore.user.value = result
      }
    })

    return {
      isBottomDrawerActive,
      count,
      raiseKeyCount: () => {
        count.value += 1
      },
    }
  },
})
</script>

<style lang="scss" scoped>
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
