<template>
  <div>
    <q-btn class="float-right q-ma-xs" rounded v-for="i in 10" :key="i">{{
      ex[i - 1]
    }}</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const ex = [
  '사람과그룹',
  '대출',
  '어학,외국어',
  '응용소프트웨어개발',
  '파이썬',
  '메이플스토리',
  '올림픽',
  '시',
  '옥련동',
  '웹툰',
]

export default defineComponent({
  name: 'CategoryButtons',
  setup() {
    return { ex }
  },
})
</script>
