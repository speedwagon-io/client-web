<template>
  <q-page class="column content-center">
    <div class="wrapper">
      <p>회원가입을 위해 이용약관에 동의해주세요</p>
      <q-card flat>
        <q-card-section>
          <q-checkbox
            v-model="checkAll"
            checked-icon="done"
            unchecked-icon="done"
            label="모두 동의합니다."
          />
        </q-card-section>
        <q-card-section>
          <q-option-group :options="options" type="checkbox" v-model="group" />
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn class="full-width" size="lg" label="다음으로" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'PolicyAgreement',
  emits: ['menu-name'],
  setup(props, { emit }) {
    onMounted(() => {
      emit('menu-name', '약관동의')
    })

    return {
      checkAll: ref(false),
      group: ref([]),
      options: [
        { label: '[필수] 이용약관1', value: 'one' },
        { label: '[필수] 이용약관2', value: 'two' },
        { label: '[선택] 마케팅 메세지 수신 동의', value: 'three' },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 90%;
  max-width: 500px;
  padding-top: 10%;
}
</style>
