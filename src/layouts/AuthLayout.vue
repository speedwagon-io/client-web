<template>
  <q-layout view="lHh lpR lFf">
    <q-header>
      <q-toolbar
        class="justify-between"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        <GoBack v-if="isGoBackShown" :icon="'chevron_left'" />
        <q-toolbar-title class="text-center">
          {{ menuName }}
        </q-toolbar-title>
        <GoBack v-if="isCloseShown" :icon="'close'" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view
        @menu-name="setMenuName"
        @back-or-close="showGoBackOrClose"
        v-slot="{ Component }"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import GoBack from 'components/buttons/GoBack.vue'

export default defineComponent({
  name: 'AuthLayout',
  components: { GoBack },
  setup() {
    const router = useRouter()
    const quasar = useQuasar()

    const menuName = ref('')
    const isGoBackShown = ref(true)
    const isCloseShown = ref(false)

    return {
      menuName,
      setMenuName(menu: string) {
        menuName.value = menu
      },
      isGoBackShown,
      isCloseShown,
      showGoBackOrClose(backOrClose: 'BACK' | 'CLOSE') {
        switch (backOrClose) {
          case 'BACK':
            isGoBackShown.value = true
            isCloseShown.value = false
            break
          case 'CLOSE':
            isGoBackShown.value = false
            isCloseShown.value = true
            break
          default:
            isGoBackShown.value = false
            isCloseShown.value = false
            break
        }
      },
      isDark: computed(() => quasar.dark.isActive),
    }
  },
})
</script>
