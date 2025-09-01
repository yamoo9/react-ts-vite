import { useCallback, useRef, useState } from 'react'

export default function useArray<T>(initialValue: T[] = []) {
  const [array, setArray] = useState<T[]>(initialValue)
  const arrayRef = useRef<T[]>(initialValue)

  const set = useCallback(
    (next: T[]) => setArray(Array.isArray(next) ? next : []),
    []
  )

  const push = useCallback(
    (...items: T[]) => setArray((array) => [...array, ...items]),
    []
  )

  const replace = useCallback(
    (index: number, item: T) =>
      setArray((array) => array.map((t, i) => (index === i ? item : t))),
    []
  )

  const filter = useCallback(
    (fn: (item: T, index: number, array: T[]) => boolean) =>
      setArray((array) => array.filter(fn)),
    []
  )

  const remove = useCallback(
    (index: number) => setArray((array) => array.filter((_, i) => i !== index)),
    []
  )

  const reset = useCallback(() => setArray(arrayRef.current), [])
  const clear = useCallback(() => setArray([]), [])

  return {
    array,
    set,
    push,
    replace,
    filter,
    remove,
    clear,
    reset,
  }
}
