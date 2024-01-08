<template>
	<div> callback page </div>
</template>
  
<script lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const { accessToken } = storeToRefs(authStore)

export default defineComponent({
	name: 'Callback',
	setup() {
		onMounted(() => {
			if (route.hash) {
				route.hash.split('&').forEach((item) => {
					const [key, value] = item.split('=')
					if (key === 'id_token') {
						accessToken.value = value
						router.push('/')
					}
				})
			}
		})
	}
})


</script>