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

    <section class="q-ma-lg">
      <q-btn class="full-width" icon="mail" icon-right="send" label="?">
        개의 새로운 메세지가 있습니다.
      </q-btn>
    </section>

    <section class="q-ma-md">
      <router-link to="/login">로그인하기 ></router-link>
      <MenuButtonGrid />
    </section>
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
