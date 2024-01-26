import { watch } from "vue"
import { useRoute } from "vue-router"

export const useWatchRoute = (emit: (event: 'menu-name' | 'back-or-close', ...args: any[]) => void) => {
  const route = useRoute()

  const watchRouteForRegisterLayout = (path: string, menuName: string, backOrClose: 'BACK' | 'CLOSE') => {
    watch(
      route,
      to => {
        if (to.path === path) {
          emit('menu-name', menuName)
          emit('back-or-close', backOrClose)
        }
      },
      {
        immediate: true,
      },
    )
  }

  return {
    watchRouteForRegisterLayout
  }
}
