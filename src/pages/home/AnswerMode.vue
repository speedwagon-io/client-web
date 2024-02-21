<template>
  <div>
    <section>
      <p class="text-weight-bold text-subtitle2">진행중인 답변(0)</p>
      <div class="row justify-start">
        <ContentButton
          :title="'답변제목'"
          :content="'답변내용'"
          :progress="true"
        />
      </div>
    </section>

    <section>
      <p class="text-weight-bold text-subtitle2">
        OO님의 답변을 기다리고 있어요!
      </p>
      <div class="row justify-start">
        <ContentButton
          v-for="x of 12"
          :key="x"
          :title="'제목'"
          :content="x.toString()"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ContentButton from 'components/buttons/ContentButton.vue'

export default defineComponent({
  name: 'AnswerMode',
  components: { ContentButton },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
