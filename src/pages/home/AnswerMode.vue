<template>
  <div>
    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton v-if="!data.subject" width="100px" height="100%" />
        <span v-else>진행중인 답변(0)</span>
      </p>
      <div class="row justify-start">
        <ContentButton
          :subject="data.subject"
          :content="data.content"
          :progress="true"
          :progressValue="0"
        />
      </div>
    </section>

    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton v-if="!data.subject" width="150px" height="100%" />
        <span v-else>OO님의 답변을 기다리고 있어요!</span>
      </p>
      <div class="row justify-start">
        <ContentButton
          v-for="x of 12"
          :key="x"
          :subject="'제목'"
          :content="x.toString()"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import ContentButton from 'components/buttons/ContentButton.vue'

export default defineComponent({
  name: 'AnswerMode',
  components: { ContentButton },
  setup() {
    const data = ref({
      subject: '',
      content: '',
      progressValue: 0,
    })

    onMounted(() => {
      setTimeout(() => {
        data.value = {
          subject: '답변제목',
          content: '답변내용',
          progressValue: 0.3,
        }
      }, 2000)
    })

    return {
      data,
    }
  },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
