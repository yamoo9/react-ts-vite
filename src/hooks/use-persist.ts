import { useEffect, useState } from 'react'

export default function usePersist<T = unknown>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof globalThis === 'undefined') return initialValue
    try {
      const value = globalThis.localStorage.getItem(key)
      if (value) return JSON.parse(value)
    } catch (error) {
      console.error(`localStorage에 ${key} 값 읽기에 실패했습니다.`, error)
    }
    return initialValue
  })

  useEffect(() => {
    if (typeof globalThis === 'undefined') return
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error(`localStorage에 ${key} 값 설정에 실패했습니다.`, error)
    }
  }, [key, state])

  return [state, setState] as const
}
