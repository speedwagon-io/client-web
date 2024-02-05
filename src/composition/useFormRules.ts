import { Ref } from 'vue'
import {
  isValidEmail,
  isValidPassword,
  passwordValidators,
} from './useFormValidation'

export const useFormRules = (
  errorMessage: Ref<{
    email?: string
    pwCheck?: string
    code?: string
  }>,
  metaData?: Ref<{
    password1: string
  }>,
) => {
  const emailRules = (value: string) => {
    errorMessage.value.email = ''

    if (!value || value.length === 0) {
      return true
    }

    if (!isValidEmail(value as string)) {
      return '이메일 형식이 올바르지 않습니다.'
    }

    return true
  }

  const pwRules = (value: string) => {
    if (value.length === 0) {
      return true
    }

    return isValidPassword(value, passwordValidators)
  }

  const pwCheckRules = (value: string) => {
    errorMessage.value.pwCheck = ''

    if (value.length === 0) {
      return true
    }

    if (
      metaData &&
      metaData.value.password1 &&
      value !== metaData.value.password1
    ) {
      return '비밀번호가 일치하지 않습니다.'
    }

    return true
  }

  return {
    emailRules,
    pwRules,
    pwCheckRules,
  }
}
