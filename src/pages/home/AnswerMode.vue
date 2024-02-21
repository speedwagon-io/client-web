<template>
  <div>
    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton v-if="!data.title" width="100px" height="100%" />
        <span v-else>진행중인 답변(0)</span>
      </p>
      <div class="row justify-start">
        <ContentButton
          :title="data.title"
          :content="data.content"
          :progress="true"
          :progressValue="data.progressValue"
        />
      </div>
    </section>

    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton v-if="!data.title" width="150px" height="100%" />
        <span v-else>OO님의 답변을 기다리고 있어요!</span>
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
import { defineComponent, onMounted, ref } from 'vue'

import ContentButton from 'components/buttons/ContentButton.vue'

export default defineComponent({
  name: 'AnswerMode',
  components: { ContentButton },
  setup() {
    const data = ref({
      title: '',
      content: '',
      progressValue: 0,
    })

    onMounted(() => {
      console.log('AnswerMode mounted')
      setTimeout(() => {
        data.value = {
          title: '답변제목',
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
