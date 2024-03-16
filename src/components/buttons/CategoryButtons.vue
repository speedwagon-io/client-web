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
        :class="isChosen(val) ? 'text-weight-bold' : ''"
        rounded
        :outline="isChosen(val)"
        v-for="(val, id) of buttons"
        :key="id"
        @click="choiceToggle(val)"
      >
        {{ val }}
      </q-btn>
      {{ choiceList }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CategoryButtons',
  props: {
    buttons: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const choiceList = ref<string[]>([])

    watch(
      () => props.buttons,
      change => {
        choiceList.value = choiceList.value.filter(e => change.includes(e))
        emit('category-choice', choiceList.value)
      },
    )

    const choiceToggle = (val: string) => {
      if (choiceList.value.includes(val)) {
        choiceList.value = choiceList.value.filter(e => e !== val)
      } else {
        choiceList.value.push(val)
      }
      emit('category-choice', choiceList.value)
    }
    return {
      choiceToggle,
      choiceList,
      isChosen: (val: string) => {
        return choiceList.value.includes(val)
      },
    }
  },
})
</script>
