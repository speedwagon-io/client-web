import { api } from 'boot/axios'

import { UserInfo } from './user.type'

const getCurrentUser = async () => {
  const result = await api.get('/users/self')
  return result.data as UserInfo
}

export { getCurrentUser }
