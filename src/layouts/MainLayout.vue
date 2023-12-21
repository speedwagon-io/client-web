<template>
  <q-layout view="lHh lpR lFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="!isMobile" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/quasar-logo-vertical.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="!isMobile" v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="isMobile" class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/quasar-logo-vertical.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    const quasar = useQuasar()

    const isMobile = computed(() => {
      return quasar.screen.lt.md
        ? true
        : false
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isMobile
    }
  }
}
</script>
