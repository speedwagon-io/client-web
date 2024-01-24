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
              :error-message="errorMessage[1]"
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
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import {
  isValidEmail,
  isValidPassword,
  passwordValidators,
  useFormValidation,
} from '../../util/useFormValidation'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signUp } from 'aws-amplify/auth'

export default defineComponent({
  name: 'EmailRegister',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const quasar = useQuasar()
    const { formRef, formBindValidation, formHasError } = useFormValidation()

    onMounted(() => {
      formBindValidation()
    })

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

    const errorMessage = ref(['', ''])
    const loading = ref(false)

    const handleSignUp = async () => {
      if (password1.value !== password2.value) {
        errorMessage.value[1] = '비밀번호가 일치하지 않습니다.'
        return
      }

      loading.value = true
      try {
        await signUp({
          username: email.value,
          password: password1.value,
        })
      } catch (error: any) {
        switch (error.name) {
          case 'UsernameExistsException':
            errorMessage.value[0] = '이미 가입된 메일입니다.'
            break
          case 'UserLambdaValidationException':
            if (error.message.indexOf('Email already in use') !== -1) {
              errorMessage.value[0] = '카카오로 가입된 메일입니다.'
            }
            break
          default:
            break
        }
        return
      } finally {
        loading.value = false
      }

      quasar
        .dialog({
          title: '안내',
          message: '인증번호가 발송되었습니다.',
        })
        .onOk(() => {
          router.push(`/register/email/verify?email=${email.value}`)
        })
        .onDismiss(() => {
          router.push(`/register/email/verify?email=${email.value}`)
        })
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

    const pwRules = (value: string) => {
      if (value.length === 0) {
        return true
      }

      return isValidPassword(value, passwordValidators)
    }

    const pwCheckRules = (value: string) => {
      errorMessage.value[1] = ''

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
      errorMessage,
      loading,
      handleSignUp,
      emailRules,
      pwRules,
      pwCheckRules,
      formRef,
      formHasError,
      onEmailError: computed(() => errorMessage.value[0].length > 0),
      onPwNotEqualError: computed(() => errorMessage.value[1].length > 0),
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
