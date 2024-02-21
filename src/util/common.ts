export const isEmptyObject = (param: Record<string, unknown>) => {
  return Object.keys(param).length === 0 && param.constructor === Object
}
