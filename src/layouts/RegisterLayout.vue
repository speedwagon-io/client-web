<template>
  <q-layout view="lHh lpR lFf">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar class="justify-between">
        <q-btn flat round dense @click="goBack">
          <q-icon v-show="isGoBackShown" name="chevron_left" />
        </q-btn>
        <q-toolbar-title class="text-center">
          {{ menuName }}
        </q-toolbar-title>
        <q-btn flat round dense @click="goBack">
          <q-icon v-show="isCloseShown" name="close" />
        </q-btn>
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterLayout',
  setup() {
    const router = useRouter()

    const menuName = ref('')
    const isGoBackShown = ref(true)
    const isCloseShown = ref(false)

    const goBack = () => {
      router.go(-1)
    }

    return {
      menuName,
      goBack,
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
            break;
          case 'CLOSE':
            isGoBackShown.value = false
            isCloseShown.value = true
            break;
          default:
            break;
        }
      },
      showClose() {
        
      },
    }
  },
})
</script>
