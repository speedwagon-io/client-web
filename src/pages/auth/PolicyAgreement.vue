<template>
  <q-page class="column content-center">
    <div class="wrapper">
      <p>회원가입을 위해 이용약관에 동의해주세요</p>
      <q-card flat>
        <q-card-section>
          <q-checkbox
            v-model="checkAll"
            checked-icon="done"
            unchecked-icon="done"
            label="모두 동의합니다."
          />
        </q-card-section>
        <q-card-section>
          <q-option-group :options="options" type="checkbox" v-model="group">
            <template v-slot:label="options">
              <div class="row items-center">
                <span>{{ options.label }}</span>
                <q-btn
                  flat
                  round
                  class="absolute"
                  style="right: 10px"
                  @click.stop="openDetail(options.value)"
                >
                  <q-icon name="chevron_right" />
                </q-btn>
              </div>
            </template>
          </q-option-group>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            class="full-width"
            size="lg"
            label="다음으로"
            :disable="!requiredChecked"
            @click="next"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useWatchRoute } from 'src/composition/useWatchRoute'

const options = [
  { label: '[필수] 이용약관1', value: 'one', required: true },
  { label: '[필수] 이용약관2', value: 'two', required: true },
  { label: '[선택] 마케팅 메세지 수신 동의', value: 'three', required: false },
]

const handleCheckAll = (group: Ref<string[]>) => {
  const checkAll = computed({
    get: () => options.length === group.value.length,
    set: (value: boolean) => {
      group.value = value ? options.map(option => option.value) : []
    },
  })
  return { checkAll }
}

const checkRequired = (group: Ref<string[]>) => {
  const requiredChecked = computed(() => {
    const requiredOnes = options
      .filter(option => option.required)
      .map(option => {
        return option.value
      })
    return requiredOnes.every(v => group.value.includes(v))
  })
  return { requiredChecked }
}

export default defineComponent({
  name: 'PolicyAgreement',
  emits: ['menu-name', 'back-or-close'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const { watchRouteForRegisterLayout } = useWatchRoute(emit)

    onMounted(() => {
      watchRouteForRegisterLayout('/register/policy', '약관동의', 'BACK')
    })

    const group = ref([])

    const openDetail = (value: string) => {
      router.push(`/register/policy/detail?page=${value}`)
    }

    const next = () => {
      if (route.query.method === 'email') {
        router.push('/register/email')
      }
    }

    return {
      group: group,
      options: options,
      ...handleCheckAll(group),
      ...checkRequired(group),
      openDetail,
      next,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 90%;
  max-width: 500px;
  padding-top: 10%;
}

.q-option-group {
  &:deep(.q-checkbox) {
    width: 100%;
  }

  &:deep(.q-checkbox__label) {
    width: 100%;
  }
}
</style>
src/composition/useWatchRoute
