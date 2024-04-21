<template>
  <q-btn>
    <div class="row justify-between items-center full-width q-py-xs text-left">
      <div class="column items-start col-11">
        <div class="row q-py-xs">
          <ContentLabel :name="'0분전'" />
          <ContentLabel :name="'0답변'" />
        </div>
        <span class="text-weight-bold text-subtitle1">
          <q-skeleton v-if="!subject" type="text" width="40px" />
          <span v-else>{{ subject }}</span>
        </span>
        <span class="text-weight-light text-body2">
          <q-skeleton
            v-if="typeof content !== 'string'"
            type="text"
            width="80px"
          />
          <span v-else>{{ content }}</span>
        </span>
      </div>
      <q-icon name="chevron_right" class="col-1" />
    </div>
    <QnAProgress v-if="progress" :progressValue="progressValue" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ContentLabel from './attachments/ContentLabel.vue'
import QnAProgress from './attachments/QnAProgress.vue'

export default defineComponent({
  name: 'ContentButton',
  components: { ContentLabel, QnAProgress },
  props: {
    subject: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: undefined,
    },
    progress: {
      type: Boolean,
      default: false,
    },
    progressValue: {
      type: Number,
      default: 0,
    },
  },
})
</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .q-btn {
    width: calc(100% - 1em);
    margin: 0.5em;
  }
}
@media (min-width: 600px) {
  .q-btn {
    width: calc(50% - 1em);
    margin: 0.5em;
  }
}
@media (min-width: 1024px) {
  .q-btn {
    width: calc(33.33% - 1em);
    margin: 0.5em;
  }
}
@media (min-width: 1920px) {
  .q-btn {
    width: calc(25% - 1em);
    margin: 0.5em;
  }
}
</style>
