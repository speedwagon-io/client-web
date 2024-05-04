<template>
  <q-page>
    <section class="content">
      <q-header>
        <q-toolbar
          class="justify-between"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          <GoBack :icon="'chevron_left'" />
        </q-toolbar>
      </q-header>
      <section class="q-px-md">
        <header class="row justify-between q-py-md">
          <UserProfile />
          <span>하하</span>
        </header>
        <div class="column">
          <div>제목</div>
          <div>내용</div>
        </div>
        <footer class="row justify-between q-py-md">
          <div class="row">
            <ContentLabel :name="'0분전'" />
            <ContentLabel :name="'0답변'" />
          </div>
          <div>카테고리</div>
        </footer>
      </section>
    </section>
    <section class="row items-center justify-evenly"></section>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import UserProfile from 'components/profile/UserProfile.vue'
import GoBack from 'components/buttons/GoBack.vue'
import ContentLabel from 'components/buttons/attachments/ContentLabel.vue'

export default defineComponent({
  name: 'QuestionDetail',
  components: { UserProfile, GoBack, ContentLabel },
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

<style>
.content {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 3px 4px -3px gray;
}
</style>
