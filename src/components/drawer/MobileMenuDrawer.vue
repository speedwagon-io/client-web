<template>
  <q-drawer side="right" behavior="mobile" :width="screenWidth">
    <q-toolbar class="justify-between">
      <span>바로가기</span>
      <div>
        <q-icon class="cursor-pointer" name="settings" size="lg" />
        <q-icon
          class="cursor-pointer"
          name="close"
          size="lg"
          @click="closeMenuDrawer()"
        />
      </div>
    </q-toolbar>

    <router-link to="/login">로그인하기 ></router-link>

    <MenuButtonGrid />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import MenuButtonGrid from 'components/button-group/MenuButtonGrid.vue'

export default defineComponent({
  name: 'MobileMenuDrawer',
  components: {
    MenuButtonGrid,
  },
  emits: ['close-menu-drawer'],
  setup(props, { emit }) {
    const quasar = useQuasar()

    return {
      closeMenuDrawer() {
        emit('close-menu-drawer')
      },
      screenWidth: quasar.screen.width,
    }
  },
})
</script>
