<template>
  <q-page class="column content-center">
    <div class="wrapper">
      <q-card flat>
        <q-card-section>
          <q-form ref="formRef">
            <q-input
              label="이메일"
              stack-label
              placeholder="이메일을 입력하세요"
              autofocus
              :rules="[emailRules]"
              lazy-rules
              :error-message="errorMessage.email"
              :error="onResendError"
              v-model="email"
              type="email"
            >
              <template v-slot:after>
                <q-btn
                  label="코드발송"
                  size="lg"
                  :loading="loading.code"
                  :disable="formHasError"
                  @click="handleSendResetPwCode"
                />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-section v-if="isCodeSent">
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
            />
            <q-input
              label="새비밀번호"
              stack-label
              placeholder="새로운 비밀번호를 입력하세요"
              :rules="[pwRules]"
              v-model="password1"
              type="password"
              autocomplete="off"
            />
            <q-input
              label="새비밀번호 재확인"
              stack-label
              placeholder="새로운 비밀번호를 다시 입력하세요"
              :rules="[pwCheckRules]"
              :error-message="errorMessage.pwCheck"
              :error="onPwNotEqualError"
              v-model="password2"
              type="password"
              autocomplete="off"
            />
          </q-form>
        </q-card-section>
        <q-card-actions v-if="isCodeSent" class="q-px-md">
          <q-btn
            class="full-width"
            size="lg"
            label="비밀번호 재설정"
            :loading="loading.reset"
            @click="handleComfirmResetPw"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import { useFormValidation } from 'src/composition/useFormValidation'
import { useFormRules } from 'src/composition/useFormRules'
import { useWatchRoute } from 'src/composition/useWatchRoute'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { confirmResetPassword, resetPassword } from 'aws-amplify/auth'

export default defineComponent({
  name: 'ResetPassword',
  emits: ['menu-name', 'back-or-close'],
  setup(props, { emit }) {
    const router = useRouter()
    const quasar = useQuasar()
    const { formRef, formBindValidation, formHasError } = useFormValidation()
    const { watchRouteForRegisterLayout } = useWatchRoute(emit)

    onMounted(() => {
      formBindValidation()
      watchRouteForRegisterLayout(
        '/register/reset_password',
        '비밀번호 찾기',
        'BACK',
      )
    })

    const email = ref('')
    const password1 = ref('')
    const password2 = ref('')
    const code = ref()
    const isCodeSent = ref(false)

    const loading = ref({
      code: false,
      reset: false,
    })
    const errorMessage = ref({
      email: '',
      pwCheck: '',
      code: '',
    })
    const metaData = ref({
      password1: password1,
    })
    const { emailRules, pwRules, pwCheckRules } = useFormRules(
      errorMessage,
      metaData,
    )

    const handleComfirmResetPw = async () => {
      if (password1.value !== password2.value) {
        errorMessage.value.pwCheck = '비밀번호가 일치하지 않습니다.'
        return
      }

      loading.value.reset = true
      try {
        await confirmResetPassword({
          username: email.value,
          confirmationCode: code.value,
          newPassword: password1.value,
        })

        router.push({
          path: '/next/login',
          state: {
            title: '비밀번호가 변경되었습니다!',
            email: email.value
          }
        })
      } catch (error: any) {
        switch (error.name) {
          case 'CodeMismatchException':
            errorMessage.value.code = '인증 코드가 일치하지 않습니다.'
            break
          case 'LimitExceededException':
            errorMessage.value.code =
              '너무 많은 시도로 이용이 제한되었습니다. 잠시후 다시 시도해보세요.'
            break
          default:
            break
        }
      } finally {
        loading.value.reset = false
      }
    }

    const handleSendResetPwCode = async () => {
      loading.value.code = true
      try {
        const result = await resetPassword({ username: email.value })
        const resetPasswordStep = result.nextStep?.resetPasswordStep

        if (resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
          quasar
            .dialog({
              title: '안내',
              message: '<span>인증번호가 발송되었습니다.</span>',
              html: true
            })
            .onOk(() => {
              isCodeSent.value = true
            })
            .onDismiss(() => {
              isCodeSent.value = true
            })
        }
      } catch (error: any) {
        switch (error.name) {
          case 'InvalidParameterException':
            errorMessage.value.email =
              '인증되지 않은 이메일입니다. 비밀번호를 재설정 할 수 없습니다.'
            break
          case 'LimitExceededException':
            errorMessage.value.email =
              '인증메일 발송 한도 초과. 잠시후 다시 시도해보세요.'
            break
          case 'UserNotFoundException':
            errorMessage.value.email = '존재하지 않는 이메일입니다.'
            break
          default:
            break
        }
      } finally {
        loading.value.code = false
      }
    }

    return {
      email,
      password1,
      password2,
      code,
      isCodeSent,
      loading,
      errorMessage,
      handleComfirmResetPw,
      handleSendResetPwCode,
      emailRules,
      codeRules: () => {
        errorMessage.value.code = ''
        return true
      },
      pwRules,
      pwCheckRules,
      formRef,
      formHasError,
      onResendError: computed(() => errorMessage.value.email.length > 0),
      onConfirmError: computed(() => errorMessage.value.code.length > 0),
      onPwNotEqualError: computed(() => errorMessage.value.pwCheck.length > 0),
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
