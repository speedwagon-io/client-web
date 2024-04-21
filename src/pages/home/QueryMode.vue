<template>
  <div>
    <section v-if="isSignedIn">
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton
          v-if="preparingMyWaitingQuestions"
          width="100px"
          height="100%"
        />
        <span v-else>진행중인 질문 ({{ myWaitingQuestions.length }})</span>
      </p>
      <div class="row justify-start">
        <ContentButton
          v-if="preparingMyWaitingQuestions"
          :progress="true"
          :progressValue="0"
        />
        <ContentButton
          v-else-if="myWaitingQuestions.length > 0"
          v-for="question in myWaitingQuestions"
          :key="question.id"
          :subject="question?.subject"
          :content="question?.content.split(' ').slice(5).join(' ')"
          :progress="true"
          :progressValue="question?.progress || 0.1"
          :to="{
            name: 'QuestionDetail',
            params: {
              id: question.id,
            },
          }"
        />
        <div class="text-center" v-else>진행중인 질문이 없습니다</div>
      </div>
    </section>

    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton
          v-if="preparingMyWaitingQuestions"
          width="50px"
          height="100%"
        />
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
import { useUserSession } from 'src/composition/useUserSession'

export default defineComponent({
  name: 'QueryMode',
  components: { ContentButton },
  setup() {
    const { isAuthenticated } = useUserSession()

    const myWaitingQuestions = ref<QuestionInfo[]>([])
    const preparingMyWaitingQuestions = ref(false)

    const isSignedIn = ref(false)

    onMounted(async () => {
      isSignedIn.value = (await isAuthenticated(null)) as boolean

      if (isSignedIn.value) {
        preparingMyWaitingQuestions.value = true
        myWaitingQuestions.value = await getMyWaitingQeustions()
        preparingMyWaitingQuestions.value = false
      }
    })

    return {
      isSignedIn,
      myWaitingQuestions,
      preparingMyWaitingQuestions,
    }
  },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
