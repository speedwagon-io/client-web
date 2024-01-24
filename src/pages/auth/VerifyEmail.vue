<template>
  <q-page class="column content-center">
    <div class="wrapper">
      <q-card flat>
        <q-card-section>
          <q-form>
            <q-input
              label="이메일"
              :disable="true"
              stack-label
              placeholder="이메일을 입력하세요"
              :error-message="errorMessage[0]"
              :error="onResendError"
              v-model="email"
              type="email"
            >
              <template v-slot:after>
                <q-btn
                  label="재발송"
                  style="color: #000000;"
                  size="lg"
                  :loading="loading[0]"
                  :disable="errorMessage[0].length > 0"
                  @click="handleResendSignUpCode"
                />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-form>
            <q-input
              label="인증코드"
              stack-label
              placeholder="6자리 코드를 입력하세요"
              :rules="[codeRules]"
              :error-message="errorMessage[1]"
              :error="onConfirmError"
              v-model="code"
              type="text"
            >
              <template v-slot:after>
                <q-btn
                  label="인증하기"
                  style="color: #000000;"
                  size="lg"
                  :loading="loading[1]"
                  @click="handleConfirmSignUp"
                />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { AmplifyConfig } from '../../../amplifyconfig'
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

    const loading = ref([false, false])
    const errorMessage = ref(['', ''])

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
      loading.value[1] = true
      try {
        const result = await confirmSignUp({
          username: email.value,
          confirmationCode: code.value,
        })
        console.log(result)
      } catch (error: any) {
        switch (error.name) {
          case 'CodeMismatchException':
            errorMessage.value[1] = '인증 코드가 일치하지 않습니다.'
            break
          default:
            break
        }
      } finally {
        loading.value[1] = false
      }
    }

    const handleResendSignUpCode = async () => {
      loading.value[0] = true
      try {
        await resendSignUpCode({ username: email.value })
      } catch (error: any) {
        switch (error.name) {
          case 'LimitExceededException':
            errorMessage.value[0] =
              '인증메일 발송 한도 초과. 1시간후 다시 시도해보세요.'
            break
          default:
            break
        }
      } finally {
        loading.value[0] = false
      }
    }

    const codeRules = () => {
      errorMessage.value[1] = ''
      return true
    }

    return {
      email,
      code,
      loading,
      errorMessage,
      handleConfirmSignUp,
      handleResendSignUpCode,
      codeRules,
      onResendError: computed(() => errorMessage.value[0].length > 0),
      onConfirmError: computed(() => errorMessage.value[1].length > 0),
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
