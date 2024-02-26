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
    <!-- TODO] 버튼 모양이 비스무리한게 많아보이는데 컴포넌트화 해야할까? -->
    <section class="q-ma-lg">
      <q-btn class="full-width">
        <div class="row justify-between full-width">
          <q-icon name="mail" />
          ?개의 새로운 메세지가 있습니다.
          <q-icon name="chevron_right" />
        </div>
      </q-btn>
    </section>

    <section class="q-ma-md">
      <router-link to="/auth/login">로그인하기 ></router-link>
      <MenuButtonGrid class="q-my-md" />
    </section>
    <q-btn @click="handleSignOut">로그아웃</q-btn>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import MenuButtonGrid from 'components/buttons/MenuButtonGrid.vue'

import { useUserSession } from 'src/composition/useUserSession'

export default defineComponent({
  name: 'MobileMenuDrawer',
  components: {
    MenuButtonGrid,
  },
  emits: ['close-menu-drawer'],
  setup(props, { emit }) {
    const quasar = useQuasar()

    const { logOut } = useUserSession()

    const handleSignOut = async () => {
      await logOut()
    }

    return {
      closeMenuDrawer() {
        emit('close-menu-drawer')
      },
      screenWidth: quasar.screen.width,
      handleSignOut,
    }
  },
})
</script>
