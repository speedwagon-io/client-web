import { ref } from 'vue'
import { defineStore } from 'pinia'

export const menuDisplayStore = defineStore('menu', () => {
  const isHeaderActive = ref(true)

  const toggleHeader = () => {
    isHeaderActive.value = !isHeaderActive.value
  }

  return { isHeaderActive, toggleHeader }
})
