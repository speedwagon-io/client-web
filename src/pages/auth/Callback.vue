<template>
  <div>callback page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'

import { getCurrentSession } from 'src/util/authUtil'

export default defineComponent({
  name: 'Callback',
  setup() {
    const router = useRouter()
    const authStore = storeToRefs(useAuthStore())

    const routeAfterLogin = () => {
      // TODO] 약관 동의 여부 확인 후 적절한 곳으로 리다이렉트
      router.push('/')
    }

    onMounted(async () => {
      const tokenAndSub = await getCurrentSession()
      if (tokenAndSub.accessToken) {
        authStore.accessToken.value = tokenAndSub.accessToken
        // TODO] oauth 인증 이후 유저 조회(key는 sub)해서 상태관리(로컬스토리지는?)하고
        const mockResult = {
          id: 1,
          email: 'test@test.com',
          email_verified: true,
          nickname: 'Teddy',
          short_bio: '안녕하세요 반가워요',
          image_thumbnail_s3key: 's3://exmple/path',
          created_at: new Date('2024-01-25 23:14:33.52521'),
        }
        authStore.user.value = mockResult
        routeAfterLogin()
      }
    })
  },
})
</script>
