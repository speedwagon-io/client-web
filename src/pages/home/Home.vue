<template>
  <q-page padding>
    <AnswerMode />
    <QueryMode />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AnswerMode from 'pages/home/AnswerMode.vue'
import QueryMode from 'pages/home/QueryMode.vue'

export default defineComponent({
  name: 'Home',
  components: { AnswerMode, QueryMode },
})
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 20px;
}
</style>
