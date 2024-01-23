<template>
  <q-page class="column content-center">
    <div class="wrapper">
      <q-card flat>
        <q-card-section class="row justify-between">
          <q-form class="col-9 q-pr-sm">
            <q-input
              label="이메일"
              :disable="true"
              stack-label
              placeholder="이메일을 입력하세요"
              v-model="email"
              type="email"
            />
          </q-form>
          <q-btn class="col" label="재발송" @click="handleResendSignUpCode" />
        </q-card-section>
        <q-card-section class="row justify-between">
          <q-form class="col-6 q-pr-sm">
            <q-input
              label="인증코드"
              stack-label
              placeholder="6자리 코드를 입력하세요"
              v-model="code"
              type="text"
            />
          </q-form>
          <q-btn class="col" label="인증하기" @click="handleConfirmSignUp" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'

export default defineComponent({
  name: 'VerifyEmail',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const route = useRoute()

    const email = ref()
    const code = ref()

    watch(
      route,
      to => {
        if (to.path === '/register/email/verify') {
          emit('menu-name', '이메일 인증')
          emit('show-go-back')

          if (to.query.email) {
            email.value = to.query.email
          }
        }
      },
      {
        immediate: true,
      },
    )

    const handleConfirmSignUp = async () => {
      const result = await confirmSignUp({
        username: email.value,
        confirmationCode: code.value,
      })

      console.log(result)
    }

    const handleResendSignUpCode = async () => {
      try {
        await resendSignUpCode({ username: email.value })
      } catch (error: any) {
        switch (error.name) {
          case 'LimitExceededException':
            // TODO] 인증메일 발송 한도 초과: 1시간뒤 다시 시도해보세요
            break
          default:
            break
        }
      }
    }

    return {
      email: email,
      code: code,
      handleConfirmSignUp,
      handleResendSignUpCode,
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
