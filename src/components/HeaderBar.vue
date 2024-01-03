<template>
  <q-toolbar>
    <HamburgerButton v-if="!isMobile" @click="toggleMenuDrawer()" />

    <q-toolbar-title>
      <img src="../assets/speedwagon_logo.png" class="logo" />
    </q-toolbar-title>

    <HamburgerButton v-if="isMobile" @click="toggleMenuDrawer()" />
  </q-toolbar>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import HamburgerButton from 'components/HamburgerButton.vue'

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
