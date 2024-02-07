import { api } from 'boot/axios'

const getCurrentUser = async () => {
  const result = await api.get('/users/self')
  return result
}

export { getCurrentUser }
