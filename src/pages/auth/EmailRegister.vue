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
              v-model="email"
              type="email"
            />
            <q-input
              label="비밀번호"
              stack-label
              placeholder="비밀번호를 입력하세요"
              :rules="[pwRules]"
              lazy-rules
              v-model="password1"
              type="password"
              autocomplete="off"
            />
            <q-input
              label="비밀번호 재확인"
              stack-label
              placeholder="비밀번호를 다시 입력하세요"
              :rules="[pwCheckRules]"
              lazy-rules
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
            :disable="formHasError"
            @click="handleSignUp"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useFormValidation } from '../../util/useFormValidation'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signUp } from 'aws-amplify/auth'

const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

const passwordValidators: ((s: string) => true | string)[] = [
  s => s.length >= 8 || '비밀번호는 8자 이상입니다.',
  s => s.length <= 99 || '비밀번호는 99자 이하입니다.',
  s => /[@!#$%^&*()-+_]/.test(s) || '특수문자를 하나이상 포함해야 합니다.',
  s => /\d/.test(s) || '숫자를 하나이상 포함해야 합니다.',
  s => !/\s/.test(s) || '공백은 입력할 수 없습니다.',
]

const isValidPassword = (
  value: string,
  validators: ((s: string) => true | string)[],
) => {
  for (let v of validators) {
    let r = v(value)
    if (r !== true) return r
  }
  return true
}

export default defineComponent({
  name: 'EmailRegister',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
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

    const handleSignUp = async () => {
      try {
        await signUp({
          username: email.value,
          password: password1.value,
        })
      } catch (error: any) {
        switch (error.name) {
          case 'UsernameExistsException':
            // TODO] 이메일 중복 안내메세지. rule에서 하는거랑 별개로 처리?
            break
          case 'UserLambdaValidationException':
            if (error.message.indexOf('Email already in use') !== -1) {
              // TODO] 서버 api로 처리하면 여기서 할 필요 없지 않을까
              return '카카오로 가입된 메일입니다.'
            }
            break
          default:
            return true
        }
      }

      router.push(`/register/email/verify?email=${email.value}`)
      return true
    }

    const emailRules = async (value: string) => {
      if (value.length === 0) {
        return true
      }

      if (!isValidEmail(value)) {
        return '이메일 형식이 올바르지 않습니다.'
      }

      // TODO] 회원조회 api 붙여서 이메일 중복 체크
      return true
    }

    const pwRules = (value: string) => {
      if (value.length === 0) {
        return true
      }

      if (password2.value && value !== password2.value) {
        pwCheckRules('sdfsdf')
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
      handleSignUp,
      emailRules,
      pwRules,
      pwCheckRules,
      formRef,
      formHasError,
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
