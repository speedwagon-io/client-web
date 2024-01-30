<template>
	<q-btn-toggle
		v-model="mode"
		class="q-pa-sm"
		no-caps
		rounded
		unelevated
		toggle-color="primary"
		color="white"
		text-color="primary"
		:options="[
			{label: '질문자모드', value: 'query'},
			{label: '답변자모드', value: 'wagon'}
		]"
	/>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'QnAModeToggle',
    setup() {
      return { mode: ref('query') }
    },
  })
  </script>