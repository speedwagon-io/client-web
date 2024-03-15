import { api } from 'boot/axios'

const postQuestion = async (content: string, categoryIds: number[]) => {
  const result = await api.post('/questions', {
    content: content,
    categoryIds: categoryIds,
  })
  return result.data
}

export { postQuestion }
