import { api } from 'boot/axios'

const getCategoryPrediction = async (query: string) => {
  const result = await api.post('/fasttext/run', { query: query })
  return result
}

export { getCategoryPrediction }
