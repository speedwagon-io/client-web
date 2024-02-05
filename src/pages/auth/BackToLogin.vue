<template>
	<q-page class="column justify-between q-pa-lg">
		<p>회원가입 완료!!!</p>
		<div class="self-center">
			<img src="../../assets/flower_check.svg" alt="">
		</div>
		<q-btn
			class="full-width"
			size="lg"
			label="로그인"
		/>
	</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'BackToLogin',
	setup() {
		return {}
	},
})
</script>

<style lang="scss" scoped>
.q-page {
	background: linear-gradient(143.97deg, #FFF2EC 13.22%, #FFDCDC 95.14%);;
}
</style>
