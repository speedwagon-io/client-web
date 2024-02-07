import { defineStore } from 'pinia'
import { ref } from 'vue'

import { UserInfo } from 'src/api/user.type'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo>()

  return {
    user,
  }
})
