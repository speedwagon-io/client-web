import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useQuesitonStore = defineStore('question', () => {
  const question = ref<string>('')
  question.value = localStorage.getItem('question') || ''

  watch(question, (val: string) => {
    localStorage.setItem('question', val)
  })

  return {
    question,
  }
})
