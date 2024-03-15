export const isEmptyObject = (param: Record<string, unknown>) => {
  return Object.keys(param).length === 0 && param.constructor === Object
}

type PredictResult = [string[], string]
export const parseCategory = (param: {
  no_komoran: PredictResult
  with_komoran: PredictResult
}) => {
  const merged = [
    ...new Set([...param.with_komoran[0], ...param.no_komoran[0]]),
  ]
  const result = merged.map(val => val.replace('__label__', ''))
  return result
}
