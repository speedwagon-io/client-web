import { defineStore } from 'pinia'
import { ref } from 'vue'

import { UserInfo, TermsAgreement } from 'src/api/user.type'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo>()
  const termsAgreement = ref<TermsAgreement>()

  return {
    user,
    termsAgreement,
  }
})
