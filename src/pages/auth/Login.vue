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
              v-model="email"
              type="email"
            />
            <q-input
              label="비밀번호"
              stack-label
              placeholder="비밀번호를 입력하세요"
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
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CatchyPhrase from 'components/static/CatchyPhrase.vue'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signInWithRedirect, signIn, resendSignUpCode } from 'aws-amplify/auth'

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

    let isEmailSignIn = ref(route.query.method === 'email' ? true : false)
    const email = ref('')
    const password = ref('')

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

    return {
      email: email,
      password: password,
      isEmailSignIn,
      handleSignIn,
      async handleEmailSignIn() {
        try {
          const result = await signIn({
            username: email.value,
            password: password.value,
          })
          const signInStep = result.nextStep?.signInStep

          if (signInStep === 'CONFIRM_SIGN_UP') {
            await resendSignUpCode({ username: email.value })
            router.push(`/register/email/verify?email=${email.value}`)
          }
        } catch (error: any) {
          switch (error.name) {
            case 'UserNotFoundException':
              // TODO] 없는 유저
              break
            case 'NotAuthorizedException':
              // TODO] 아이디/비번 오류
              break
            case 'UserAlreadyAuthenticatedException':
              // TODO] 이미 로그인 되어 있음
              break
            case 'LimitExceededException':
              // TODO] 인증메일 발송 한도 초과: 1시간뒤 다시 시도해보세요
              break
            default:
              break
          }
          return
        }
      },
      toEmailSignin() {
        router.push('/login?method=email')
      },
      goBack,
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
