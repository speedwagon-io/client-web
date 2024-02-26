<template>
  <div>
    <section>
      <p class="text-weight-bold text-subtitle2">
        <q-skeleton v-if="!data.title" width="100px" height="100%" />
        <span v-else>진행중인 질문(0)</span>
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
        <q-skeleton v-if="!data.title" width="50px" height="100%" />
        <span v-else>인기 질문</span>
      </p>
      <div class="row justify-start">
        <ContentButton
          v-for="x of 12"
          :key="x"
          :title="'제목'"
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

export default defineComponent({
  name: 'QueryMode',
  components: { ContentButton },
  setup() {
    const data = ref({
      title: '',
      content: '',
      progressValue: 0,
    })

    onMounted(() => {
      setTimeout(() => {
        data.value = {
          title: '제목',
          content: '내용',
          progressValue: 0.5,
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
