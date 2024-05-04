<template>
  <div class="row flex-center">
    <q-avatar :size="size">
      <img v-if="image" :src="image" />
      <img v-else src="~assets/flower_check.svg" />
    </q-avatar>
    <div class="q-pl-sm">
      <span>{{ username }}</span>
      <div v-if="tags" class="row">
        <span v-for="(tag, index) in tags" :key="tag">
          {{ tag }}<span v-if="index != tags.length - 1">&nbsp;|&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

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
    username: {
      type: String,
      default: '이름',
    },
    tags: {
      type: Array as PropType<string[]>,
    },
  },
})
</script>
