<template>
  <q-page padding>
    <TextareaSimple> title="TextareaSimple" ></TextareaSimple>
    <q-btn @click="handleSignOut">로그아웃</q-btn>
  </q-page>
</template>

<script lang="ts">
import TextareaSimple from 'components/TextareaSimple.vue'
import { defineComponent, ref } from 'vue'
import { signOut } from '@aws-amplify/auth'

const handleSignOut = async () => {
  await signOut()
}

export default defineComponent({
  name: 'QueryPage',
  components: { TextareaSimple },
  setup() {
    return { text: ref(''), handleSignOut }
  },
})
</script>
