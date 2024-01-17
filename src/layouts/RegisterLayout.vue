<template>
  <q-layout view="lHh lpR lFf">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar>
        <q-btn flat round dense>
          <q-icon name="chevron_left" />
        </q-btn>
        <q-toolbar-title class="text-center">
          {{ menuName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view @menu-name="setMenuName" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RegisterLayout',
  setup() {
    const menuName = ref('')

    return {
      menuName,
      setMenuName(menu: string) {
        menuName.value = menu
      },
    }
  },
})
</script>
