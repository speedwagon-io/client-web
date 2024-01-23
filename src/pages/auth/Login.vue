<template>
  <q-page class="column content-center">
    <q-icon
      class="self-end cursor-pointer"
      name="close"
      size="lg"
      @click="goBack"
    />
    <div class="wrapper">
      <CatchyPhrase />
      <q-card flat v-if="isEmailSignIn">
        <q-card-section>
          <q-form>
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
              :error-message="errorMessage"
              :error="onSignInError"
              v-model="password"
              type="password"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            class="full-width"
            size="lg"
            label="로그인"
            :loading="loading"
            @click="handleEmailSignIn"
          />
        </q-card-actions>
      </q-card>
      <q-card flat v-else>
        <q-card-actions class="q-px-md">
          <q-btn
            class="full-width"
            size="lg"
            label="카카오톡으로 로그인"
            @click="handleSignIn"
          />
        </q-card-actions>
        <q-card-actions class="q-px-md">
          <q-btn
            class="full-width"
            size="lg"
            label="이메일로 로그인"
            @click="toEmailSignin"
          />
        </q-card-actions>
        <q-card-section class="q-pa-none row items-center justify-center">
          <router-link to="/register/policy?method=email"
            >회원가입 하기</router-link
          >
          <span class="separator">|</span>
          <div>비밀번호 찾기</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CatchyPhrase from 'components/static/CatchyPhrase.vue'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signInWithRedirect, signIn, resendSignUpCode } from 'aws-amplify/auth'
import { isValidEmail } from 'src/util/useFormValidation'

const handleSignIn = async () => {
  await signInWithRedirect({
    provider: {
      custom: 'Kakao',
    },
  })
}

export default defineComponent({
  name: 'Login',
  components: {
    CatchyPhrase,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isEmailSignIn = ref(route.query.method === 'email' ? true : false)
    const email = ref('')
    const password = ref('')

    const errorMessage = ref('')
    const loading = ref(false)

    watch(
      () => route.query,
      change => {
        if (change.method === 'email') {
          isEmailSignIn.value = true
        } else {
          isEmailSignIn.value = false
        }
      },
    )

    const goBack = () => {
      router.go(-1)
    }

    const handleEmailSignIn = async () => {
      loading.value = true
      try {
        const result = await signIn({
          username: email.value,
          password: password.value,
        })
        const signInStep = result.nextStep?.signInStep

        if (signInStep === 'CONFIRM_SIGN_UP') {
          await resendSignUpCode({ username: email.value })
          alert('인증번호가 발송되었습니다.')
          router.push(`/register/email/verify?email=${email.value}`)
        }
      } catch (error: any) {
        switch (error.name) {
          case 'LimitExceededException':
            errorMessage.value =
              '인증메일 발송 한도 초과. 1시간후 다시 시도해보세요.'
            break
          default:
            errorMessage.value = '아이디 혹은 비밀번호를 확인해주세요.'
            break
        }
        return
      } finally {
        loading.value = false
      }
    }

    const emailRules = async (value: string) => {
      errorMessage.value = ''

      if (value.length === 0) {
        return true
      }

      if (!isValidEmail(value)) {
        return '이메일 형식이 올바르지 않습니다.'
      }

      return true
    }

    const pwRules = () => {
      errorMessage.value = ''
      return true
    }

    return {
      email,
      password,
      errorMessage,
      loading,
      isEmailSignIn,
      handleSignIn,
      handleEmailSignIn,
      toEmailSignin() {
        router.push('/login?method=email')
      },
      goBack,
      emailRules,
      pwRules,
      onSignInError: computed(() => errorMessage.value.length > 0),
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

.separator {
  padding: 0 20px;
}
</style>