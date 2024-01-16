<template>
  <q-page class="column content-center">
    <q-icon name="close" size="lg" class="self-end" @click="goBack" />
    <div class="check">
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
          <div>회원가입</div>
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

import { AmplifyConfig } from '../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { signInWithRedirect } from 'aws-amplify/auth'

const handleSignIn = async () => {
  await signInWithRedirect({
    provider: {
      custom: 'KakaotalkOIDC',
    },
  })
}

const handleEmailSignIn = async () => {
  await signInWithRedirect({
    provider: {
      custom: 'KakaotalkOIDC',
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
      email: ref(''),
      password: ref(''),
      isEmailSignIn,
      handleSignIn,
      handleEmailSignIn,
      toEmailSignin() {
        router.push('/login?method=email')
      },
      goBack,
    }
  },
})
</script>

<style lang="scss" scoped>
.check {
  width: 80%;
  max-width: 500px;
  padding-top: 10%;
}

.separator {
  padding: 0 20px;
}
</style>
