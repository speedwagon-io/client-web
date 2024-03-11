<template>
  <q-btn flat round dense @click="goBack">
    <q-icon :name="icon" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GoBack',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.go(-1)
    }

    return {
      goBack,
    }
  },
})
</script>
