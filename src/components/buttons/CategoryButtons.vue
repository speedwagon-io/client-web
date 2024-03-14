<template>
  <div>
    <q-btn
      class="float-right q-ma-xs"
      :class="isChosen(id) ? 'text-weight-bold' : ''"
      rounded
      :outline="isChosen(id)"
      v-for="(val, id) of buttons"
      :key="id"
      @click="choiceToggle(id)"
    >
      {{ val }}
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CategoryButtons',
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
  },
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
      choiceToggle,
      choiceList,
      isChosen: (id: number) => {
        return choiceList.value.includes(id)
      },
    }
  },
})
</script>
