<template>
  <q-avatar class="row items-center justify-evenly" :size="size">
    <img v-if="image" :src="image" />
    <img v-else src="../../assets/flower_check.svg" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserProfile',
  props: {
    image: {
      type: String,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
})
</script>
