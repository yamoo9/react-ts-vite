import { useEffect, useRef } from 'react'

export default function usePrev<T = unknown>(value: T): T {
  const prevValueRef = useRef<T>(value)

  useEffect(() => {
    console.log('이전 값:', prevValueRef.current)
    console.log('현재 값:', value)
    console.log(
      '이전, 현재 값은 같다. =',
      Object.is(value, prevValueRef.current)
    )

    prevValueRef.current = value
  }, [value])

  return prevValueRef.current
}
