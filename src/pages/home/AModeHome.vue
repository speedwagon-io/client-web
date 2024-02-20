<template>
  <q-page padding>
    <section>
      <p class="text-weight-bold text-subtitle2">진행중인 답변(0)</p>
      <div class="row justify-start">
        <ContentButton :title="'제목'" :content="'내용'" :progress="true" />
      </div>
    </section>

    <section>
      <p class="text-weight-bold text-subtitle2">나를 위한 질문들</p>
      <div class="row justify-start">
        <ContentButton
          v-for="x of 12"
          :key="x"
          :title="'제목'"
          :content="x.toString()"
        />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ContentButton from 'components/buttons/ContentButton.vue'

export default defineComponent({
  name: 'AModeHome',
  components: { ContentButton },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
