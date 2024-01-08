<template>
  <q-page class="column content-center">
    <div class="check">
      <div>
        3분안에 응답률 100%,
      </div>
      <div>
        스피드웨건.
      </div>
      <q-card flat>
        <q-card-section>
          <q-form>
            <q-input label="이메일" stack-label placeholder="이메일을 입력하세요" v-model="email" type="email" />
            <q-input label="비밀번호" stack-label placeholder="비밀번호를 입력하세요" v-model="password" type="password" />
          </q-form>
        </q-card-section>
        <q-card-section class="q-pa-none row items-center justify-between">
          <div>
            <q-checkbox v-model="autoSignIn" label="자동로그인" />
          </div>
          <div>
            <span>회원가입</span>
            <span> • </span>
            <span>비밀번호 찾기</span>
          </div>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn size="lg" class="full-width" label="카카오톡으로 로그인" />
        </q-card-actions>
        <q-card-actions class="q-px-md">
          <q-btn size="lg" class="full-width" label="로그인" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    return {
      email: ref(''),
      password: ref(''),
      autoSignIn: ref(false),
    }
  }
})
</script>

<style lang="scss" scoped>
.check {
  width: 80%;
  padding-top: 100px;
}
</style>
