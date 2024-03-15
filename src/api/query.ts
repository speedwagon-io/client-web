import { api } from 'boot/axios'

const postQuestion = async (query: string) => {
  const result = await api.post('/question', {
    query: query,
  })
  return result
}

export { postQuestion }
