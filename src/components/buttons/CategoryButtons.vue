<template>
  <div>
    <div v-if="loading">
      <q-skeleton
        v-for="i of 10"
        :key="i"
        type="QChip"
        class="float-right q-ma-xs"
        :width="Math.floor(Math.random() * 71) + 45 + 'px'"
        height="35px"
      />
    </div>
    <div v-else>
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
    loading: {
      type: Boolean,
      default: false,
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
