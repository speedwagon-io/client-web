import { h, computed, getCurrentInstance } from 'vue'

import useDark, { useDarkProps } from '../util/user-dark'
import useSize, { useSizeProps } from '../util/use-size'

import { createComponent } from '../util/create.js'
import { hMergeSlot, hMergeSlotSafely } from '../util/render.js'

const defaultSizes = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14,
}

function width(val) {
  return {
    width: val * 100 + '%',
  }
}

export default createComponent({
  name: 'QLinearProgress',

  props: {
    ...useDarkProps,
    ...useSizeProps,

    value: {
      type: Number,
      default: 0,
    },
    buffer: Number,

    color: String,

    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,

    animationSpeed: {
      type: [String, Number],
      default: 2100,
    },

    instantFeedback: Boolean,
  },

  setup(props, { slots }) {
    const { proxy } = getCurrentInstance()
    const isDark = useDark(props, proxy.$q)
    const sizeStyle = useSize(props, defaultSizes)

    const motion = computed(
      () => props.indeterminate === true || props.query === true,
    )
    const style = computed(() => ({
      ...(sizeStyle.value !== null ? sizeStyle.value : {}),
      overflow: 'visible',
    }))

    const classes = computed(
      () =>
        'q-linear-progress' +
        (props.color !== void 0 ? ` text-${props.color}` : ''),
    )

    const transitionSuffix = computed(
      () => `with${props.instantFeedback === true ? 'out' : ''}-transition`,
    )

    const trackStyle = computed(() => ({
      opacity: 'unset',
      background:
        'linear-gradient(270deg, #FFFFFF -0.95%, rgba(255, 255, 255, 0.1) 87.45%)',
    }))

    const trackClass = computed(
      () =>
        'q-linear-progress__track absolute-full' +
        ` q-linear-progress__track--${transitionSuffix.value}` +
        ` q-linear-progress__track--${
          isDark.value === true ? 'dark' : 'light'
        }` +
        (props.rounded === true ? ' rounded-borders' : ''),
    )

    const modelStyle = computed(() => ({
      ...width(motion.value === true ? 1 : props.value),
      position: 'relative',
      height: 'inherit',
      transition: `width ${props.animationSpeed}ms ease-in-out`,
    }))

    const modelClass = computed(
      () =>
        'q-linear-progress__model absolute-full' +
        ` q-linear-progress__model--${transitionSuffix.value}` +
        ` q-linear-progress__model--${
          motion.value === true ? 'in' : ''
        }determinate` +
        (props.rounded === true ? ' rounded-borders' : ''),
    )

    const stripeStyle = computed(() => ({ width: `${props.value * 100}%` }))
    const stripeClass = computed(
      () =>
        'q-linear-progress__stripe absolute-' +
        ` q-linear-progress__stripe--${transitionSuffix.value}`,
    )

    return () => {
      const child = [
        h('div', {
          class: trackClass.value,
          style: trackStyle.value,
        }),

        h(
          'div',
          {
            class: modelClass.value,
            style: modelStyle.value,
          },
          hMergeSlotSafely(slots.thumb),
        ),
      ]

      props.stripe === true &&
        motion.value === false &&
        child.push(
          h('div', {
            class: stripeClass.value,
            style: stripeStyle.value,
          }),
        )

      return h(
        'div',
        {
          class: classes.value,
          style: style.value,
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': 1,
          'aria-valuenow': props.indeterminate === true ? void 0 : props.value,
        },
        hMergeSlot(slots.default, child),
      )
    }
  },
})
