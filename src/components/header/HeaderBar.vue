<template>
  <q-toolbar>
    <q-toolbar-title>
      <router-link class="logo" to="/">Speedwagon</router-link>
    </q-toolbar-title>

    <q-btn color="black" flat round dense>
      <q-icon name="notifications" />
    </q-btn>
    <q-btn color="black" flat round dense>
      <q-icon name="search" />
    </q-btn>
    <HamburgerButton v-if="!isMobile" @click="toggleMenuDrawer()" />
    <HamburgerButton v-if="isMobile" @click="toggleMenuDrawer()" />
  </q-toolbar>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'

import HamburgerButton from 'components/header/HamburgerButton.vue'

export default defineComponent({
  name: 'HeaderBar',
  components: { HamburgerButton },
  emits: ['toggle-menu-drawer'],
  setup(props, { emit }) {
    const quasar = useQuasar()

    return {
      toggleMenuDrawer() {
        emit('toggle-menu-drawer')
      },
      isMobile: quasar.platform.is.mobile,
    }
  },
})
</script>

<style lang="scss" scoped>
.logo {
  color: black;
  text-decoration: none;
}
</style>
