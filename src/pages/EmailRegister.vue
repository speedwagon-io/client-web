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
          <q-btn
            class="full-width"
            size="lg"
            label="다음으로"
            :disable="password1 !== password2"
            @click="handleSignUp"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signUp } from 'aws-amplify/auth'

export default defineComponent({
  name: 'EmailRegister',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const router = useRouter()
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

    const email = ref('')
    const password1 = ref('')
    const password2 = ref('')

    const handleSignUp = async () => {
      try {
        await signUp({
          username: email.value,
          password: password1.value,
        })
      } catch (error: any) {
        console.log(error)
        switch (error.name) {
          case 'UsernameExistsException':
            // TODO] 이메일 중복 안내메세지
            break
          case 'UserLambdaValidationException':
            if (error.message.indexOf('Email already in use') !== -1) {
              // TODO] 카카오 중복 안내메세지
              console.log(error.message)
            }
            break
          case 'EmptySignUpUsername':
            // TODO] username 없음
            break
          case 'EmptySignUpPassword':
            // TODO] password 없음
            break
          case 'InvalidParameterException':
            // TODO] 이메일 형식 오류
            break
          case 'InvalidPasswordException':
            // TODO] 비밀번호 형식 오류
            break
          default:
            break
        }
        return
      }

      router.push(`/register/email/verify?email=${email.value}`)
    }

    return {
      email: email,
      password1: password1,
      password2: password2,
      handleSignUp,
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
