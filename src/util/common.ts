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

export const calculateElapsedTime = (dateTime: Date | undefined) => {
  if (!dateTime) {
    return '?분전'
  }

  const now = new Date()
  const diff = +now - +dateTime

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return `${years}년전`
  } else if (months > 0) {
    return `${months}개월전`
  } else if (days > 0) {
    return `${days}일전`
  } else if (hours > 0) {
    return `${hours}시간전`
  } else if (minutes > 0) {
    return `${minutes}분전`
  } else {
    return `${seconds}초전`
  }
}
