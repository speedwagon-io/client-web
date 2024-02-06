<template>
<q-btn>
	<div class="row justify-between items-center full-width">
		<div class="column items-start">
			<div>0분전 0답변</div>
			<span>{{ title }}</span>
			<span>{{ content }}</span>
		</div>
		<q-icon name="chevron_right" />
	</div>
</q-btn>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ContentButton',
	props: {
		title: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
	},
	setup() {
		return {}
	}
})
</script>
