<template>
  <q-btn>
    <div class="row justify-between items-center full-width">
      <div class="column items-start">
        <div class="row q-py-xs">
          <InButtonTopLabel :name="'0분전'" />
          <InButtonTopLabel :name="'0답변'" />
        </div>
        <span class="text-weight-bold text-subtitle1">{{ title }}</span>
        <span class="text-weight-light text-body2">{{ content }}</span>
      </div>
      <q-icon name="chevron_right" />
    </div>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import InButtonTopLabel from 'components/labels/InButtonTopLabel.vue'

export default defineComponent({
  name: 'ContentButton',
  components: { InButtonTopLabel },
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
