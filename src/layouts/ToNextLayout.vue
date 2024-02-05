<template>
  <q-layout view="lHh lpR lFf">
    <q-page-container style="padding-top: 100px">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToNextLayout',
  setup() {

    return {
    }
  },
})
</script>
