import { api } from 'boot/axios'

import { QuestionInfo } from './question.type'

const postQuestion = async (content: string, categories: string[]) => {
  const result = await api.post('/questions', {
    content: content,
    categories: categories,
  })
  return result.data
}

const getMyWaitingQuestions = async () => {
  const result = await api.get('/users/self/questions', {
    params: {
      status: 'waiting',
    },
  })
  return result.data as QuestionInfo[]
}

export { postQuestion, getMyWaitingQuestions }
