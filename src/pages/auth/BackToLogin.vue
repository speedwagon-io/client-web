<template>
  <q-page class="column justify-between q-pa-lg">
    <p>{{ title }}</p>
    <div class="self-center">
      <img src="../../assets/flower_check.svg" alt="" />
    </div>
    <q-btn
      class="full-width"
      size="lg"
      label="로그인"
      @click="goToLoginWithEmail"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BackToLogin',
  setup() {
    const router = useRouter()
    const { title, email } = history.state

    const goToLoginWithEmail = () => {
      router.push({
        path: '/login',
        query: { method: 'email' },
        state: { email: email },
      })
    }

    return {
      title,
      goToLoginWithEmail,
    }
  },
})
</script>

<style lang="scss" scoped>
.q-page {
  background: linear-gradient(143.97deg, #fff2ec 13.22%, #ffdcdc 95.14%);
}
</style>
