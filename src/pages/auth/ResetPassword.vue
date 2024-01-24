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
              :error-message="errorMessage[0]"
              :error="onResendError"
              v-model="email"
              type="email"
            >
              <template v-slot:after>
                <q-btn
                  label="코드발송"
                  style="color: #000000"
                  size="lg"
                  :loading="loading[0]"
                  :disable="formHasError"
                  @click="handleResetPassword"
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
              :error-message="errorMessage[1]"
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
            :loading="loading[1]"
            @click="handleComfirmResetPw"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { confirmResetPassword, resetPassword } from 'aws-amplify/auth'
import {
  isValidEmail,
  isValidPassword,
  passwordValidators,
  useFormValidation,
} from 'src/util/useFormValidation'

export default defineComponent({
  name: 'ResetPassword',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const route = useRoute()
    const quasar = useQuasar()
    const { formRef, formBindValidation, formHasError } = useFormValidation()

    onMounted(() => {
      formBindValidation()
    })

    const email = ref('')
    const password1 = ref('')
    const password2 = ref('')
    const code = ref()
    const isCodeSent = ref(false)

    const loading = ref([false, false])
    const errorMessage = ref(['', ''])

    watch(
      route,
      to => {
        if (to.path === '/register/reset_password') {
          emit('menu-name', '비밀번호 찾기')
          emit('show-go-back')
        }
      },
      {
        immediate: true,
      },
    )

    const handleComfirmResetPw = async () => {
      loading.value[1] = true
      try {
        await confirmResetPassword({
          username: email.value,
          confirmationCode: code.value,
          newPassword: password1.value,
        })
      } catch (error: any) {
        switch (error.name) {
          case 'CodeMismatchException':
            errorMessage.value[1] = '인증 코드가 일치하지 않습니다.'
            break
          case 'LimitExceededException':
            errorMessage.value[1] =
              '너무 많은 시도로 이용이 제한되었습니다. 잠시후 다시 시도해보세요.'
            break
          default:
            break
        }
      } finally {
        loading.value[1] = false
      }
    }

    const handleResetPassword = async () => {
      loading.value[0] = true
      try {
        const result = await resetPassword({ username: email.value })
        const resetPasswordStep = result.nextStep?.resetPasswordStep

        if (resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
          quasar
            .dialog({
              title: '안내',
              message: '인증번호가 발송되었습니다.',
            })
            .onOk(() => {
              isCodeSent.value = true
            })
            .onDismiss(() => {
              isCodeSent.value = true
            })
        }
      } catch (error: any) {
        console.log(error)
        switch (error.name) {
          case 'InvalidParameterException':
            errorMessage.value[0] =
              '인증되지 않은 이메일입니다. 비밀번호를 재설정 할 수 없습니다.'
            break
          case 'LimitExceededException':
            errorMessage.value[0] =
              '인증메일 발송 한도 초과. 잠시후 다시 시도해보세요.'
            break
          case 'UserNotFoundException':
            errorMessage.value[0] = '존재하지 않는 이메일입니다.'
            break
          default:
            break
        }
      } finally {
        loading.value[0] = false
      }
    }

    const emailRules = async (value: string) => {
      errorMessage.value[0] = ''

      if (value.length === 0) {
        return true
      }

      if (!isValidEmail(value)) {
        return '이메일 형식이 올바르지 않습니다.'
      }

      return true
    }

    const codeRules = () => {
      errorMessage.value[1] = ''
      return true
    }

    const pwRules = (value: string) => {
      if (value.length === 0) {
        return true
      }

      if (password2.value && value !== password2.value) {
        return '비밀번호가 일치하지 않습니다.'
      }

      return isValidPassword(value, passwordValidators)
    }

    const pwCheckRules = (value: string) => {
      if (value.length === 0) {
        return true
      }

      if (password1.value && value !== password1.value) {
        return '비밀번호가 일치하지 않습니다.'
      }

      return true
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
      handleResetPassword,
      emailRules,
      codeRules,
      pwRules,
      pwCheckRules,
      formRef,
      formHasError,
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
