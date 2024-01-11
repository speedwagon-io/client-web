<template>
  <div class="q-pa-md">
    <div
      v-if="drawerMode !== 'handler'"
      class="fixed-full"
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
        <q-scroll-area class="scroll-area">
          <TextareaSimple />
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import TextareaSimple from 'components/input/TextareaSimple.vue'

// TODO] vue2 to vue3
const drawerMinHeight = 100
const drawerTopOffset = 100
const drawerOpenRatioHalf = 50

export default {
  name: 'SwipeableBottomSheet',
  components: { TextareaSimple },
  data() {
    return {
      drawerPos: drawerMinHeight,
    }
  },

  computed: {
    drawerMaxHeight() {
      return Math.max(0, this.$q.screen.height - drawerTopOffset)
    },

    drawerOpenRatio() {
      return Math.round(
        (Math.max(0, this.drawerPos - drawerMinHeight) /
          Math.max(1, this.drawerMaxHeight - drawerMinHeight)) *
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
          (Math.max(0, this.drawerPos - drawerMinHeight) /
            Math.max(1, this.drawerMaxHeight - drawerMinHeight)) *
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
                : Math.round(this.drawerMaxHeight / 2)
              : aboveHalf
              ? Math.round(this.drawerMaxHeight / 2)
              : drawerMinHeight

          this.animateDrawerTo(targetHeight)
        })
      }
    },

    cycleDrawer() {
      const targetHeight =
        this.drawerMode === 'handler'
          ? Math.round(this.drawerMaxHeight / 2)
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
  },

  beforeUnmount() {
    clearTimeout(this.animateTimeout)
  },
}
</script>

<style lang="scss" scoped>
.slide-drawer {
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

  .scroll-area {
    height: 100%;
  }
}
</style>
