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
    @update:model-value="update"
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
import { defineComponent, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuesitonStore } from 'src/stores/question'

export default defineComponent({
  name: 'TextareaMobile',
  setup(props, { emit }) {
    const text = ref('')
    const questionStore = storeToRefs(useQuesitonStore())

    onMounted(() => {
      text.value = questionStore.question.value
      emit('update', text.value)
    })

    return {
      text,
      focus: () => {
        emit('textarea-focus')
      },
      update: (val: string | number | null) => {
        emit('update', val)
      },
      submit: () => {
        emit('submit', text.value)
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
