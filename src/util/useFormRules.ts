import { Ref } from 'vue'
import { isValidEmail } from './useFormValidation'

export const useFormRules = (
  errorMessage: Ref<{
    email?: string
    pwCheck?: string
		code?: string
  }>,
) => {
  const emailRules = (value: string) => {
    errorMessage.value.email = ''

    if (value.length === 0) {
      return true
    }

    if (!isValidEmail(value as string)) {
      return '이메일 형식이 올바르지 않습니다.'
    }

    return true
  }

  return {
    emailRules,
  }
}
