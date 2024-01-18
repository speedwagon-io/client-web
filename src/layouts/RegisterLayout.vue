<template>
  <q-layout view="lHh lpR lFf">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar class="justify-between">
        <q-btn flat round dense @click="goBack">
          <q-icon name="chevron_left" />
        </q-btn>
        <q-toolbar-title class="text-center">
          {{ menuName }}
        </q-toolbar-title>
        <q-btn flat></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view @menu-name="setMenuName" />
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

    const goBack = () => {
      router.go(-1)
    }

    return {
      menuName,
      goBack,
      setMenuName(menu: string) {
        menuName.value = menu
      },
    }
  },
})
</script>
