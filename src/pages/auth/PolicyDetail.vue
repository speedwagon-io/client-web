<template>
  <q-page class="column content-center">
    <h3>이용약관</h3>
    <div class="wrapper">{{ content }}</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { useWatchRoute } from 'src/composition/useWatchRoute'

export default defineComponent({
  name: 'PolicyDetail',
  emits: ['menu-name', 'back-or-close'],
  setup(props, { emit }) {
    const { watchRouteForRegisterLayout, watchRouteQueryParam } =
      useWatchRoute(emit)

    const content = ref('')

    onMounted(() => {
      watchRouteForRegisterLayout(
        '/register/policy/detail',
        '약관상세',
        'CLOSE',
      )
      watchRouteQueryParam('page', content)
    })

    return {
      content,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 90%;
  max-width: 500px;
}
</style>
