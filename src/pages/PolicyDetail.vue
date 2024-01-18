<template>
  <q-page class="column content-center">
    <h3>이용약관</h3>
    <div class="wrapper">이용약관 상세</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PolicyDetail',
  emits: ['menu-name', 'show-close'],
  setup(props, { emit }) {
    const route = useRoute()

    watch(
      route,
      to => {
        if (to.path === '/register/policy/detail') {
          emit('menu-name', '약관상세')
          emit('show-close')
        }
      },
      {
        immediate: true,
      },
    )

    return {}
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 90%;
  max-width: 500px;
}
</style>
