<template>
  <div>
    <q-btn
      class="float-right q-ma-xs"
      :class="isChosen(id) ? 'text-weight-bold' : ''"
      rounded
      :outline="isChosen(id)"
      v-for="(val, id) of ex"
      :key="id"
      @click="choiceToggle(id)"
    >
      {{ val }}
    </q-btn>
    {{ choiceList }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
    const choiceList = ref<number[]>([])

    const choiceToggle = (id: number) => {
      if (choiceList.value.includes(id)) {
        choiceList.value = choiceList.value.filter(e => e !== id)
      } else {
        choiceList.value.push(id)
      }
    }
    return {
      ex,
      choiceToggle,
      choiceList,
      isChosen: (id: number) => {
        return choiceList.value.includes(id)
      },
    }
  },
})
</script>
