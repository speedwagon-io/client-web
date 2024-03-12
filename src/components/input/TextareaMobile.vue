<template>
  <q-input
    v-model="text"
    rounded
    autogrow
    outlined
    :dense="true"
    input-style="max-height: 300px"
    placeholder="질문을 입력하세요"
    @focus="focus"
  >
    <template v-slot:prepend>
      <q-icon name="image" @click="console.log('image')" />
    </template>
    <template v-slot:append>
      <q-icon name="send" @click="console.log('send')" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TextareaMobile',
  setup(props, { emit }) {
    return {
      text: ref(''),
      focus: () => {
        emit('textarea-focus')
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.q-textarea {
  &:deep(.q-field__control) {
    align-items: flex-end;
  }
}
</style>
