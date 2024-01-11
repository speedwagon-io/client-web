<template>
  <q-scroll-area class="scroll-area">
    <q-input
      v-model="text"
      rounded
      autogrow
      outlined
      :dense="true"
      placeholder="질문을 입력하세요"
    >
      <template v-slot:prepend>
        <q-icon name="image" @click="console.log('image')" />
      </template>
      <template v-slot:append>
        <q-icon name="send" @click="console.log('send')" />
      </template>
    </q-input>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TextareaSimple',
  setup() {
    return { text: ref('') }
  },
})
</script>

<style lang="scss" scoped>
.scroll-area {
  height: 100%;

  .q-textarea {
    &:deep(.q-field__control) {
      align-items: flex-end;
    }
  }
}
</style>
