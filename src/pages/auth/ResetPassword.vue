<template>
  <q-page class="column content-center">
    <div class="wrapper">
      <q-card flat>
        <q-card-section>
          <q-form>
            <q-input
              label="이메일"
              stack-label
              placeholder="이메일을 입력하세요"
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
                  @click="handleResetPassword"
                />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-form>
            <q-input
              label="인증코드"
              stack-label
              placeholder="6자리 코드를 입력하세요"
              :rules="[codeRules]"
              :error-message="errorMessage[1]"
              :error="onConfirmError"
              v-model="code"
              type="text"
            >
              <template v-slot:after>
                <q-btn
                  label="인증하기"
                  style="color: #000000"
                  size="lg"
                  :loading="loading[1]"
                  @click="handleConfirmResetPw"
                />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { AmplifyConfig } from '../../../amplifyconfig'
import { Amplify } from 'aws-amplify'
Amplify.configure(AmplifyConfig)
import { confirmResetPassword, resetPassword } from 'aws-amplify/auth'

export default defineComponent({
  name: 'ResetPassword',
  emits: ['menu-name', 'show-go-back'],
  setup(props, { emit }) {
    const route = useRoute()

    const email = ref()
    const code = ref()

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

    const handleConfirmResetPw = async () => {
      loading.value[1] = true
      try {
        const result = await confirmResetPassword({
          username: email.value,
          confirmationCode: code.value,
        })
        console.log(result)
      } catch (error: any) {
        switch (error.name) {
          case 'CodeMismatchException':
            errorMessage.value[1] = '인증 코드가 일치하지 않습니다.'
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
        await resetPassword({ username: email.value })
      } catch (error: any) {
        console.log(error)
        switch (error.name) {
          case 'InvalidParameterException':
            errorMessage.value[0] =
              '인증되지 않은 이메일입니다. 비밀번호를 재설정 할 수 없습니다.'
            break
          case 'UserNotFoundException':
            errorMessage.value[0] =
              '존재하지 않는 이메일입니다.'
            break
          default:
            break
        }
      } finally {
        loading.value[0] = false
      }
    }

    const codeRules = () => {
      errorMessage.value[1] = ''
      return true
    }

    return {
      email,
      code,
      loading,
      errorMessage,
      handleConfirmResetPw,
      handleResetPassword,
      codeRules,
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
