import { api } from 'boot/axios'

import { UserInfo } from './user.type'

const getCurrentUser = async () => {
  const result = await api.get('/users/self')
  return result.data as UserInfo
}

const updateTermsAgreement = async (subscribeToMarketing: boolean) => {
  const result = await api.patch('/users/self/termsAgreement', {
    subscribeToMarketing: subscribeToMarketing,
  })
  return result
}

export { getCurrentUser, updateTermsAgreement }
