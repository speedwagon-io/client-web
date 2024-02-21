<template>
  <div>
    <section>
      <p class="text-weight-bold text-subtitle2">진행중인 질문(0)</p>
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
      <p class="text-weight-bold text-subtitle2">인기 질문</p>
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
  name: 'QueryMode',
  components: { ContentButton },
  setup() {
    const data = ref({
      title: '',
      content: '',
      progressValue: 0,
    })

    onMounted(() => {
      console.log('QueryMode mounted')
      setTimeout(() => {
        data.value = {
          title: '제목',
          content: '내용',
          progressValue: 0.5,
        }
      }, 1000)
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
