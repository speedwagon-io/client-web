import { defineComponent, markRaw } from 'vue'

export const createComponent = raw => markRaw(defineComponent(raw))
