<template>
  <q-input
    v-model="text"
    rounded
    autogrow
    outlined
    :dense="true"
    input-style="max-height: 270px"
    placeholder="질문을 입력하세요"
    @focus="focus"
    @keyup.ctrl.enter="submit"
  >
    <template v-slot:prepend>
      <img
        src="~assets/icons/image.svg"
        alt=""
        @click="console.log('image clicked')"
      />
    </template>
    <template v-slot:append>
      <img src="~assets/icons/send.svg" alt="" @click="submit" />
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
      submit: () => {
        emit('submit')
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
