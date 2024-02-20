import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useModeStore = defineStore('mode', () => {
  const user = ref<string>('query')
  user.value = localStorage.getItem('userMode') || 'query'

  watch(user, (val: string) => {
    localStorage.setItem('userMode', val)
  })

  return {
    user,
  }
})
