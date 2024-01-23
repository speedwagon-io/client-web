import { QField, QForm, QInput, QSelect, uid } from 'quasar'
import { computed, nextTick, ref } from 'vue'

// intersection type of known Quasar form components
export type FormValidationComponent = QInput | QSelect | QField

/**
 * adds form validation aware for form components
 * @formRef = template ref of QForm container
 * @formComponents = ref that will hold array of form components
 * @formIsDirty = ref sets state of a form component if its value was changed
 * @formHasError = computed ref sets if one of the form component has error
 */
export const useFormValidation = () => {
  // assign this in the consumer's QForm template ref
  const formRef = ref<QForm>()
  const formComponents = ref<
    {
      uid: string
      validationComponent: FormValidationComponent
      origModel: unknown
    }[]
  >()
  const formIsDirty = computed(() =>
    formComponents.value
      ? formComponents.value.some(
          v => v.origModel !== v.validationComponent.modelValue,
        )
      : false,
  )

  // Quasar form components has internal value called hasError
  // check if the components is in error state
  const formHasError = computed(
    () =>
      formComponents.value?.some(
        v => v.validationComponent.hasError,
      ) as boolean,
  )

  async function formBindValidation() {
    // wait for vue nextTick before binding in case data are being updated
    await nextTick()
    if (formRef.value === undefined)
      throw new Error(
        'Failed to bind validation as formRef is not assigned to a QForm in the current page!',
      )
    // get all form components that has internal validations
    formComponents.value = (
      formRef.value.getValidationComponents() as FormValidationComponent[]
    ).map(v => ({
      uid: uid(),
      validationComponent: v,
      origModel: v.modelValue,
    }))
  }

  function formReset() {
    formRef.value?.resetValidation()
    // rebind form to refresh original values if it was updated
    formBindValidation()
  }

  // watchEffect(() => {
  //   console.log('Form is dirty? ', formIsDirty.value);
  //   console.log('Form has error? ', formHasError.value);
  // });

  return {
    /**
     * must use it in your QForm to make use of validation status
     */
    formRef,
    /**
     * see form dirty status
     */
    formIsDirty,
    /**
     * see form error status
     */
    formHasError,
    /**
     * bind validations to form, must call it in your component's onMounted hook
     */
    formBindValidation,
    /**
     * resets form and re-bind validation
     */
    formReset,
  }
}

export const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export const passwordValidators: ((s: string) => true | string)[] = [
  s => s.length >= 8 || '비밀번호는 8자 이상입니다.',
  s => s.length <= 99 || '비밀번호는 99자 이하입니다.',
  s => /[a-zA-Z]/.test(s) || '영문자를 하나이상 포함해야 합니다.',
  s => /[@!#$%^&*()-+_]/.test(s) || '특수문자를 하나이상 포함해야 합니다.',
  s => /\d/.test(s) || '숫자를 하나이상 포함해야 합니다.',
  s => !/\s/.test(s) || '공백은 입력할 수 없습니다.',
]

export const isValidPassword = (
  value: string,
  validators: ((s: string) => true | string)[],
) => {
  for (const v of validators) {
    const r = v(value)
    if (r !== true) return r
  }
  return true
}
