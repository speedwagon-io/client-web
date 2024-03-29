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
              :error-message="errorMessage.email"
              :error="onSignInError"
              v-model="password"
              type="password"
              autocomplete="off"
              @keydown.enter.prevent="handleEmailSignIn"
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
      <q-card flat class="q-pa-lg" v-else>
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
          <router-link to="/auth/register/policy?method=email"
            >회원가입 하기</router-link
          >
          <span class="separator">|</span>
          <router-link to="/auth/reset_password">비밀번호 찾기</router-link>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'

import { useFormRules } from 'src/composition/useFormRules'
import { getCurrentUser } from 'src/api/user'
import { popFromUrlSearchParam } from 'src/util/routeParser'
import { useWatchRoute } from 'src/composition/useWatchRoute'

import CatchyPhrase from 'components/static/CatchyPhrase.vue'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signInWithRedirect, signIn, resendSignUpCode } from 'aws-amplify/auth'

export default defineComponent({
  name: 'Login',
  components: {
    CatchyPhrase,
  },
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const quasar = useQuasar()
    const authStore = storeToRefs(useAuthStore())
    const { watchRouteForAuthLayout } = useWatchRoute(emit)

    const isEmailSignIn = ref(route.query.method === 'email' ? true : false)
    const email = ref('')
    email.value = history.state.email
    const password = ref('')

    const loading = ref(false)
    const errorMessage = ref({
      email: '',
    })
    const { emailRules } = useFormRules(errorMessage)

    const redirect_url = ref('')
    redirect_url.value = history.state.redirect_url || ''

    onMounted(() => {
      watchRouteForAuthLayout('/auth/login', '', null)
    })

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

    const redirectTo = () => {
      // TODO] 로그인 발생시킨 곳으로 다시 goBack
      if (route.query.method === 'email') {
        router.replace('/auth/login')
        return
      }

      router.go(-1)
    }

    const handleSignIn = async () => {
      const kakaoAuthUrlOrAnyString = 'accounts.kakao.com/login'

      try {
        localStorage.setItem('previousUrl', kakaoAuthUrlOrAnyString)
        if (localStorage.getItem('previousUrl') === kakaoAuthUrlOrAnyString) {
          router.go(1)
        }

        await signInWithRedirect({
          provider: {
            custom: 'Kakao',
          },
          customState: redirect_url.value || '/',
        })
      } catch (error: any) {
        if (error.name === 'UserAlreadyAuthenticatedException') {
          router.push('/')
        }
      } finally {
        localStorage.removeItem('previousUrl')
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
              router.push({
                path: '/auth/register/email/verify',
                state: { email: email.value },
              })
            })
            .onDismiss(() => {
              router.push({
                path: '/auth/register/email/verify',
                state: { email: email.value },
              })
            })
        } else if (signInStep === 'DONE') {
          const result = await getCurrentUser()
          authStore.user.value = result

          const url = new URL(window.location.origin + redirect_url.value)
          router.push({
            path: url.pathname || '/',
            state: {
              mode: popFromUrlSearchParam(url.searchParams, 'mode'),
            },
            query: Object.fromEntries(url.searchParams),
          })
        }
      } catch (error: any) {
        switch (error.name) {
          case 'LimitExceededException':
            errorMessage.value.email =
              '인증메일 발송 한도 초과. 잠시후 다시 시도해보세요.'
            break
          case 'UserAlreadyAuthenticatedException':
            errorMessage.value.email = '이미 인증된 유저가 있습니다.'
            router.push('/')
            break
          case 'NotAuthorizedException':
            errorMessage.value.email = '아이디 혹은 비밀번호를 확인해주세요.'
            break
          case 'UserNotFoundException':
            errorMessage.value.email = '아이디 혹은 비밀번호를 확인해주세요.'
            break
          default:
            errorMessage.value.email =
              'Something went wrong. Please try again:('
            break
        }
      } finally {
        loading.value = false
      }
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
        router.replace('/auth/login?method=email')
      },
      redirectTo,
      emailRules,
      pwRules: () => {
        errorMessage.value.email = ''
        return true
      },
      onSignInError: computed(() => errorMessage.value.email.length > 0),
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
