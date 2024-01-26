<template>
  <q-page class="column content-center">
    <q-icon
      class="self-end cursor-pointer"
      name="close"
      size="lg"
      @click="redirectTo"
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
              autocomplete="off"
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
          <router-link to="/register/reset_password">비밀번호 찾기</router-link>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import CatchyPhrase from 'components/static/CatchyPhrase.vue'

import { isValidEmail } from 'src/util/useFormValidation'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signInWithRedirect, signIn, resendSignUpCode } from 'aws-amplify/auth'

export default defineComponent({
  name: 'Login',
  components: {
    CatchyPhrase,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const quasar = useQuasar()

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

    watch(
      route,
      to => {
        if (to.path === '/login') {
          if (to.query.email) {
            email.value = to.query.email as string
          }
        }
      },
      {
        immediate: true,
      },
    )

    const redirectTo = () => {
      // TODO] 로그인을 발생시킨 곳으로 로그인 이후 다시 goBack
      if (route.query.method === 'email') {
        router.push('/login')
        return
      }

      if (!route.query.redirect) {
        router.push('/')
        return
      }
    }

    const handleSignIn = async () => {
      // BUG] 카카오 로그인 화면으로 이동후 뒤로가기 해서 버튼 다시 누르면 무반응
      try {
        await signInWithRedirect({
          provider: {
            custom: 'Kakao',
          },
        })
      } catch (error: any) {
        if (error.name === 'UserAlreadyAuthenticatedException') {
          router.push('/')
        }
      }
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
        } else if (signInStep === 'DONE') {
          // TODO] 유저 조회 + 상태관리 + 리다이렉트
          router.push('/')
        }
      } catch (error: any) {
        switch (error.name) {
          case 'LimitExceededException':
            errorMessage.value =
              '인증메일 발송 한도 초과. 잠시후 다시 시도해보세요.'
            break
          case 'UserAlreadyAuthenticatedException':
            errorMessage.value = '이미 인증된 유저가 있습니다.'
            router.push('/')
            break
          default:
            errorMessage.value = '아이디 혹은 비밀번호를 확인해주세요.'
            break
        }
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
      redirectTo,
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
