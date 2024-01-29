import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  id: number
  email: string
  email_verified: boolean
  nickname: string
  short_bio: string
  image_thumbnail_s3key: string
  created_at: Date
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string>('')
  const user = ref<UserInfo>()

  return {
    accessToken,
    user,
  }
})
