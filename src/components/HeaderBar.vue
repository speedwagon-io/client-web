<template>
  <q-toolbar>
    <q-btn
      v-if="!isMobile"
      dense
      flat
      round
      icon="menu"
      @click="toggleLeftDrawer"
    />

    <q-toolbar-title>
      <img src="../assets/speedwagon_logo.png" class="logo" />
    </q-toolbar-title>
  </q-toolbar>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderBar',
  emits: ['toggle-left-drawer'],
  setup(props, { emit }) {
    const quasar = useQuasar()

    return {
      toggleLeftDrawer() {
        emit('toggle-left-drawer')
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
