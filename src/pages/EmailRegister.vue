<template>
  <q-page class="column content-center">
    <div class="wrapper">
      <q-card flat>
        <q-card-section>
          <q-form>
            <q-input
              label="이메일"
              stack-label
              placeholder="이메일을 입력하세요"
              v-model="email"
              type="email"
            />
            <q-input
              label="비밀번호"
              stack-label
              placeholder="비밀번호를 입력하세요"
              v-model="password1"
              type="password"
              autocomplete="off"
            />
            <q-input
              label="비밀번호 재확인"
              stack-label
              placeholder="비밀번호를 다시 입력하세요"
              v-model="password2"
              type="password"
              autocomplete="off"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn class="full-width" size="lg" label="다음으로" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'EmailRegister',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const route = useRoute()

    watch(
      route,
      to => {
        if (to.path === '/register/email') {
          emit('menu-name', '로그인 정보 입력')
          emit('show-go-back')
        }
      },
      {
        immediate: true,
      },
    )

    return {
      email: ref(''),
      password1: ref(''),
      password2: ref(null),
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
