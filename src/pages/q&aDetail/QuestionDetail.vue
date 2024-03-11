<template>
  <q-page class="row items-center justify-evenly">
    <q-header>
      <q-toolbar
        class="justify-between"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        <GoBack :icon="'chevron_left'" />
      </q-toolbar>
    </q-header>
    <UserProfile />
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import UserProfile from 'components/profile/UserProfile.vue'
import GoBack from 'components/buttons/GoBack.vue'

export default defineComponent({
  name: 'QuestionDetail',
  components: { UserProfile, GoBack },
  setup() {
    const router = useRouter()
    const quasar = useQuasar()

    const goBack = () => {
      router.go(-1)
    }

    return {
      goBack,
      isDark: computed(() => quasar.dark.isActive),
    }
  },
})
</script>
