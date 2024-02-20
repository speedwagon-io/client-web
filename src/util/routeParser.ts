import { RouteLocationNormalizedLoaded, LocationQueryRaw } from 'vue-router'
import { isEmptyObject } from './common'

export const makeFullPath = (
  route: RouteLocationNormalizedLoaded,
  queryObjToAdd: LocationQueryRaw,
): string => {
  const queryStringToAdd = Object.keys(queryObjToAdd)
    .map(
      key =>
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(queryObjToAdd[key] as string),
    )
    .join('&')

  if (isEmptyObject(route.query)) {
    return `${route.fullPath}?${queryStringToAdd}`
  } else {
    return `${route.fullPath}&${queryStringToAdd}`
  }
}
