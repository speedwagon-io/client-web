export function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source
}

export function hMergeSlotSafely(slot, source) {
  if (slot === void 0) {
    return source
  }

  return source !== void 0 ? source.concat(slot()) : slot()
}