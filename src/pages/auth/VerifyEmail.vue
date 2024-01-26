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
              :rules="[emailRules]"
              :error-message="errorMessage.email"
              :error="onResendError"
              v-model="email"
              type="email"
            >
              <template v-slot:after>
                <q-btn
                  label="재발송"
                  style="color: #000000"
                  size="lg"
                  :loading="loading.resend"
                  :disable="errorMessage.email.length > 0"
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
              :error-message="errorMessage.code"
              :error="onConfirmError"
              v-model="code"
              type="number"
              inputmode="decimal"
            >
              <template v-slot:after>
                <q-btn
                  label="인증하기"
                  style="color: #000000"
                  size="lg"
                  :loading="loading.verify"
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
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import { useFormRules } from 'src/util/useFormRules'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'

export default defineComponent({
  name: 'VerifyEmail',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const quasar = useQuasar()

    const email = ref()
    const code = ref()

    const loading = ref({
      resend: false,
      verify: false
    })
    const errorMessage = ref({
      email: '',
      code: '',
    })
    const { emailRules } = useFormRules(errorMessage)

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
      loading.value.verify = true
      try {
        await confirmSignUp({
          username: email.value,
          confirmationCode: code.value,
        })

        quasar
          .dialog({
            title: '안내',
            message:
              '<span>회원가입이 완료되었습니다.<br />다시 로그인 해주세요.<span>',
            html: true,
          })
          .onOk(() => {
            router.push(`/login?method=email&email=${email.value}`)
          })
          .onDismiss(() => {
            router.push(`/login?method=email&email=${email.value}`)
          })
      } catch (error: any) {
        switch (error.name) {
          case 'CodeMismatchException':
            errorMessage.value.code = '인증 코드가 일치하지 않습니다.'
            break
          case 'LimitExceededException':
            errorMessage.value.email =
              '너무 많은 시도로 이용이 제한되었습니다. 잠시후 다시 시도해보세요.'
            break
          default:
            break
        }
      } finally {
        loading.value.verify = false
      }
    }

    const handleResendSignUpCode = async () => {
      loading.value.resend = true
      try {
        await resendSignUpCode({ username: email.value })
        quasar.dialog({
          title: '안내',
          message: '인증번호가 발송되었습니다.',
        })
      } catch (error: any) {
        switch (error.name) {
          case 'LimitExceededException':
            errorMessage.value.email =
              '인증메일 발송 한도 초과. 잠시후 다시 시도해보세요.'
            break
          case 'InvalidParameterException':
            errorMessage.value.email = '이미 인증된 유저입니다.'
            break
          default:
            break
        }
      } finally {
        loading.value.resend = false
      }
    }

    return {
      email,
      code,
      loading,
      errorMessage,
      handleConfirmSignUp,
      handleResendSignUpCode,
      emailRules,
      codeRules: () => {
        errorMessage.value.code = ''
        return true
      },
      onResendError: computed(() => errorMessage.value.email.length > 0),
      onConfirmError: computed(() => errorMessage.value.code.length > 0),
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
