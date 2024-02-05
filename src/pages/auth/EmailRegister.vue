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
              :error="onEmailError"
              v-model="email"
              type="email"
            />
            <q-input
              label="비밀번호"
              stack-label
              placeholder="비밀번호를 입력하세요"
              :rules="[pwRules]"
              v-model="password1"
              type="password"
              autocomplete="off"
            />
            <q-input
              label="비밀번호 재확인"
              stack-label
              placeholder="비밀번호를 다시 입력하세요"
              :rules="[pwCheckRules]"
              :error-message="errorMessage.pwCheck"
              :error="onPwNotEqualError"
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
            :loading="loading"
            :disable="formHasError"
            @click="handleSignUp"
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
import { signUp } from 'aws-amplify/auth'

export default defineComponent({
  name: 'EmailRegister',
  emits: ['menu-name', 'back-or-close'],
  setup(props, { emit }) {
    const router = useRouter()
    const quasar = useQuasar()
    const { formRef, formBindValidation, formHasError } = useFormValidation()
    const { watchRouteForRegisterLayout } = useWatchRoute(emit)

    onMounted(() => {
      formBindValidation()
      watchRouteForRegisterLayout('/register/email', '로그인 정보 입력', 'BACK')
    })

    const email = ref('')
    const password1 = ref('')
    const password2 = ref('')

    const loading = ref(false)
    const errorMessage = ref({
      email: '',
      pwCheck: '',
    })
    const metaData = ref({
      password1: password1,
    })
    const { emailRules, pwRules, pwCheckRules } = useFormRules(
      errorMessage,
      metaData,
    )

    const handleSignUp = async () => {
      if (password1.value !== password2.value) {
        errorMessage.value.pwCheck = '비밀번호가 일치하지 않습니다.'
        return
      }

      loading.value = true
      try {
        const result = await signUp({
          username: email.value,
          password: password1.value,
        })
        const signUpStep = result.nextStep?.signUpStep

        if (signUpStep === 'CONFIRM_SIGN_UP') {
          // TODO] update user 이용약관

          quasar
            .dialog({
              title: '안내',
              message: '인증번호가 발송되었습니다.',
            })
            .onOk(() => {
              router.push({
                path: '/register/email/verify',
                state: { email: email.value },
              })
            })
            .onDismiss(() => {
              router.push({
                path: '/register/email/verify',
                state: { email: email.value },
              })
            })
        }
      } catch (error: any) {
        switch (error.name) {
          case 'UsernameExistsException':
            errorMessage.value.email = '이미 가입된 메일입니다.'
            break
          case 'UserLambdaValidationException':
            if (error.message.indexOf('Email already in use') !== -1) {
              errorMessage.value.email = '카카오로 가입된 메일입니다.'
            }
            break
          default:
            break
        }
        return
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password1,
      password2,
      errorMessage,
      loading,
      handleSignUp,
      emailRules,
      pwRules,
      pwCheckRules,
      formRef,
      formHasError,
      onEmailError: computed(() => errorMessage.value.email.length > 0),
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
