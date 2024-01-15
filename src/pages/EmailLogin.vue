<template>
  <q-page class="column content-center">
    <div class="check">
      <CatchyPhrase />
      <q-card flat>
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
          <q-btn size="lg" class="full-width" label="로그인" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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

export default defineComponent({
  name: 'EmailLogin',
  components: {
    CatchyPhrase,
  },
  setup() {
    return {
      email: ref(''),
      password: ref(''),
      handleSignIn,
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
</style>
