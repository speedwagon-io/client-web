<template>
  <q-toggle
    v-model="isDark"
    @update:model-value="toggleDark"
    checked-icon="dark_mode"
    color="black"
    unchecked-icon="light_mode"
  />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LightDarkToggle',
  setup() {
    const quasar = useQuasar()

    const isDark = ref(quasar.dark.isActive)
    const toggleDark = () => {
      quasar.dark.set(isDark.value)
    };

    return {
      isDark,
      toggleDark,
    };
  },
})
</script>
