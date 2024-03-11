<template>
  <q-page class="row items-center justify-evenly">
    <UserProfile />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import UserProfile from 'components/profile/UserProfile.vue'

export default defineComponent({
  name: 'QuestionDetail',
  components: { UserProfile },
})
</script>
