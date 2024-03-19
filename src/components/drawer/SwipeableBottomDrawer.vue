<template>
  <div class="q-pa-md">
    <div
      v-if="drawerMode !== 'handler'"
      class="fixed-full drawer-backdrop"
      :style="backdropStyle"
      aria-hidden="true"
      @click="animateDrawerTo(100)"
    ></div>
    <q-card
      class="slide-drawer slide-drawer--bottom fixed-bottom column no-wrap"
      :class="`slide-drawer--open-${drawerMode}`"
      :style="drawerStyle"
      style="border-radius: 30px 30px 0 0"
    >
      <q-card-section
        class="slide-drawer__handler--horizontal row justify-center"
        v-touch-pan.mouse.vertical="slideDrawer"
      >
        <div>
          <div class="cursor-pointer" @click="cycleDrawer"></div>
        </div>
      </q-card-section>

      <q-card-section class="col q-pt-none">
        <section>
          <q-resize-observer @resize="onResize" />
          <header>
            <TextareaMobile
              @textarea-focus="textareaFocused"
              @update="textareaUpdated"
              @submit="submitted"
              :key="textareaKey"
            />
          </header>
          <footer class="row justify-around q-mt-lg">
            <q-btn
              class="col-grow q-mr-xs"
              unelevated
              rounded
              color="grey-4"
              text-color="black"
            >
              <img src="~assets/icons/reward.svg" alt="" />
              리워드 추가
            </q-btn>
            <q-btn
              class="col-grow q-ml-xs"
              unelevated
              rounded
              color="grey-4"
              text-color="black"
            >
              <img src="~assets/icons/plus.svg" alt="" />
              카테고리 추가
            </q-btn>
            <CategoryButtons
              class="q-mt-xs"
              :buttons="categoryButtons"
              :loading="categoryButtonsLoading"
              @category-choice="categoryChosen"
            />
          </footer>
        </section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useQuesitonStore } from 'src/stores/question'
import { useUserSession } from 'src/composition/useUserSession'

import TextareaMobile from 'components/input/TextareaMobile.vue'
import CategoryButtons from 'components/buttons/CategoryButtons.vue'

import { getCategoryPrediction } from 'src/api/category'
import { postQuestion } from 'src/api/question'
import { parseCategory } from 'src/util/common'

// TODO] vue2 to vue3
const drawerMinHeight = 30
const drawerDefaultHeight = 100
const drawerTopOffset = 100
const drawerOpenRatioHalf = 50

export default {
  name: 'SwipeableBottomDrawer',
  components: { TextareaMobile, CategoryButtons },
  data() {
    return {
      drawerPos: drawerDefaultHeight,
      sectionHeight: 0,
      debouncer: {
        instance: null,
        period: 2000, // INFO] mili-second
      },
      categoryButtons: [],
      categoryButtonsLoading: false,
      categoryChoices: [],
      textareaKey: 0,
    }
  },

  computed: {
    drawerMaxHeight() {
      return Math.max(0, this.$q.screen.height - drawerTopOffset)
    },

    drawerHalfMaxHeight() {
      return Math.round(this.drawerMaxHeight / 2)
    },

    drawerHalfMaxHeightExceptHandle() {
      return this.drawerHalfMaxHeight - 40
    },

    drawerOpenRatio() {
      return Math.round(
        (Math.max(0, this.drawerPos - drawerDefaultHeight) /
          Math.max(1, this.drawerMaxHeight - drawerDefaultHeight)) *
          100,
      )
    },

    drawerStyle() {
      return {
        height: `${this.drawerMaxHeight}px`,
        transform: `translateY(${-this.drawerPos}px)`,
      }
    },

    drawerMode() {
      if (this.drawerOpenRatio > drawerOpenRatioHalf) {
        return 'full'
      }

      return this.drawerOpenRatio > 0 ? 'half' : 'handler'
    },

    backdropStyle() {
      let style =
        Math.round(
          (Math.max(0, this.drawerPos - drawerDefaultHeight) /
            Math.max(1, this.drawerMaxHeight - drawerDefaultHeight)) *
            100,
        ) * 0.4
      return {
        background: `rgba(0, 0, 0, ${style}%)`,
      }
    },
  },

  methods: {
    slideDrawer(ev) {
      const { direction, delta, isFinal } = ev

      this.drawerPos = Math.max(
        drawerMinHeight,
        Math.min(this.drawerMaxHeight, this.drawerPos - delta.y),
      )

      if (isFinal === true) {
        this.$nextTick(() => {
          const aboveHalf = this.drawerOpenRatio > drawerOpenRatioHalf
          const targetHeight =
            direction === 'up'
              ? aboveHalf
                ? this.drawerMaxHeight
                : this.drawerHalfMaxHeight
              : aboveHalf
              ? this.drawerHalfMaxHeight
              : drawerMinHeight

          this.animateDrawerTo(targetHeight)
        })
      }
    },

    cycleDrawer() {
      const targetHeight =
        this.drawerMode === 'handler'
          ? this.drawerHalfMaxHeight
          : this.drawerMode === 'half'
          ? this.drawerMaxHeight
          : drawerMinHeight

      this.animateDrawerTo(targetHeight)
    },

    animateDrawerTo(height) {
      clearTimeout(this.animateTimeout)

      const diff = height - this.drawerPos

      if (diff !== 0) {
        this.drawerPos += Math.abs(diff) < 2 ? diff : Math.round(diff / 2)

        this.animateTimeout = setTimeout(() => {
          this.animateDrawerTo(height)
        }, 30)
      }
    },

    textareaFocused() {
      if (this.sectionHeight >= this.drawerHalfMaxHeightExceptHandle) {
        this.animateDrawerTo(this.drawerMaxHeight)
        return
      }

      if (this.drawerPos <= drawerDefaultHeight) {
        this.animateDrawerTo(this.drawerHalfMaxHeight)
        return
      }
    },

    async submitted(question) {
      if (await this.isAuthenticated(null)) {
        await postQuestion(question, this.categoryChoices)

        this.$router.push('/')

        this.resetTextareaAndCategoryButtons()
        this.animateDrawerTo(drawerDefaultHeight)
      } else {
        // TODO] bringback saved text, category choice after login
        this.$router.push({
          path: '/auth/login',
          state: { redirect_url: this.$route.fullPath },
        })
      }
    },

    resetTextareaAndCategoryButtons() {
      this.categoryButtons = []
      this.textareaKey += 1
    },

    categoryChosen(val) {
      this.categoryChoices = val
    },

    async textareaUpdated(val) {
      this.questionStore.question.value = val

      if (this.debouncer.instance) {
        clearTimeout(this.debouncer.instance)
      }

      if (val.length === 0) {
        this.categoryButtons = []
        this.categoryButtonsLoading = false
        return
      }

      this.debouncer.instance = setTimeout(async () => {
        this.categoryButtonsLoading = true

        const result = await getCategoryPrediction(val)
        this.categoryButtons = parseCategory(result)

        this.categoryButtonsLoading = false
      }, this.debouncer.period)
    },

    onResize(size) {
      this.sectionHeight = size.height
      const spareArea = this.drawerHalfMaxHeightExceptHandle

      if (this.drawerMode === 'half' && this.sectionHeight >= spareArea) {
        this.animateDrawerTo(this.drawerMaxHeight)
      }
    },
  },

  beforeUnmount() {
    clearTimeout(this.animateTimeout)
  },

  setup() {
    const { isAuthenticated } = useUserSession()
    const questionStore = storeToRefs(useQuesitonStore())
    return { isAuthenticated, questionStore }
  },
}
</script>

<style lang="scss" scoped>
.drawer-backdrop {
  z-index: 2;
}
.slide-drawer {
  z-index: 3;

  &--bottom {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    bottom: unset;
    top: 100%;
    transition: background-color 0.3s ease-in-out;

    > div:last-child,
    > img:last-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__handler {
    &--horizontal {
      cursor: grab;

      > div {
        width: 60px;
        height: 8px;
        border-radius: 4px;
        background-color: rgba(200, 200, 200, 0.7);

        > div {
          margin: -8px;
          height: 24px;
        }
      }
    }
  }
}
</style>
