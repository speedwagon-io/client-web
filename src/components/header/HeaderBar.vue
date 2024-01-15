<template>
  <q-toolbar>
    <q-toolbar-title>
      Speedwagon
    </q-toolbar-title>

    <q-btn flat round dense>
      <q-icon name="notifications" />
    </q-btn>
    <q-btn flat round dense>
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
  width: 100px;
}
</style>
