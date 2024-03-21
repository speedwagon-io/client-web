<template>
  <div>
    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton v-if="questions.length === 0" width="100px" height="100%" />
        <span v-else>진행중인 질문({{ questions.length }})</span>
      </p>
      <div v-if="questions.length === 0">
        <ContentButton :progress="true" :progressValue="0" />
      </div>
      <div
        v-else
        class="row justify-start"
        v-for="question in questions"
        :key="question.id"
      >
        <ContentButton
          :subject="question?.subject"
          :content="question?.content"
          :progress="true"
          :progressValue="0"
        />
      </div>
    </section>

    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton v-if="questions.length === 0" width="50px" height="100%" />
        <span v-else>인기 질문</span>
      </p>
      <div class="row justify-start">
        <ContentButton
          v-for="x of 12"
          :key="x"
          :subject="'제목'"
          :content="x.toString()"
          :to="{
            name: 'QuestionDetail',
            params: {
              id: x,
            },
          }"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import ContentButton from 'components/buttons/ContentButton.vue'
import { getMyWaitingQeustions } from 'src/api/question'
import { QuestionInfo } from 'src/api/question.type'

export default defineComponent({
  name: 'QueryMode',
  components: { ContentButton },
  setup() {
    const questions = ref<QuestionInfo[]>([])

    onMounted(async () => {
      questions.value = await getMyWaitingQeustions()
    })

    return {
      questions,
    }
  },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
