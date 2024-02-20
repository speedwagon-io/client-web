import { Ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useWatchRoute = (
  emit?: (event: 'menu-name' | 'back-or-close', ...args: any[]) => void,
) => {
  const route = useRoute()
  const option = { immediate: true }

  const watchRouteForRegisterLayout = (
    path: string,
    menuName: string,
    backOrClose: 'BACK' | 'CLOSE',
  ) => {
    watch(
      route,
      to => {
        if (emit && to.path === path) {
          emit('menu-name', menuName)
          emit('back-or-close', backOrClose)
        }
      },
      option,
    )
  }

  const watchRouteQueryParam = (
    queryParamKey: string,
    valueToSet: Ref<string>,
  ) => {
    watch(
      route,
      to => {
        if (to.query[queryParamKey]) {
          valueToSet.value = to.query[queryParamKey] as string
          console.log(valueToSet.value)
        }
      },
      option,
    )
  }

  return {
    watchRouteForRegisterLayout,
    watchRouteQueryParam,
  }
}
