<template>
  <div
    class="q-px-sm q-mr-xs text-weight-regular text-caption"
    :class="[
      { 'bg-grey-2': style === 'GREY' },
      { 'bg-primary': style === 'ORANGE' },
    ]"
  >
    {{ name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'InButtonTopLabel',
  props: {
    name: {
      type: String,
      required: true,
    },
    style: {
      type: String as PropType<'GREY' | 'ORANGE'>,
      default: 'GREY',
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
div {
  border-radius: 45px;

  &.bg-grey-2 {
    color: black;
  }

  &.bg-primary {
    color: white;
  }
}
</style>
