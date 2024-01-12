<template>
  <div class="row">
    <div class="col-4 column flex-center" v-for="link in menuLinks" :key="link.to">
      <q-icon size="xl" :name="link.icon"></q-icon>
      <div>{{ link.title }}</div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

const menuList = [
  {
    title: '질문 전체보기',
    icon: 'forum',
    to: '/query',
  },
  {
    title: '인기질문',
    icon: 'favorite',
    to: '/login',
  },
  {
    title: '내 질문 / 내 답변',
    icon: 'bookmark',
    to: '/login',
  },
  {
    title: '카테고리',
    icon: 'star',
    to: '/login',
  },
  {
    title: '포인트관리',
    icon: 'redeem',
    to: '/login',
  },
  {
    title: '마이페이지',
    icon: 'person',
    to: '/login',
  },
]

export default defineComponent({
  name: 'MenuButtonGrid',
  setup() {
    return {
      menuLinks: menuList
    }
  }
})
</script>

<style lang="scss" scoped>
.col-4 {

}
</style>