import { api } from 'boot/axios'

const postQuestion = async (content: string, categories: string[]) => {
  const result = await api.post('/questions', {
    content: content,
    categories: categories,
  })
  return result.data
}

export { postQuestion }
