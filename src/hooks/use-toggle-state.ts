import { useCallback, useEffect, useState } from 'react'

/**
 * boolean 상태를 간편하게 on/off/toggle 할 수 있는 커스텀 훅입니다.
 *
 * 초깃값 변경 시 상태가 동기화됩니다.
 *
 * @example
 * // 기본 사용법
 * const { isToggle, on, off, toggle, set } = useToggleState()
 * on()     // true로 변경
 * off()    // false로 변경
 * toggle() // true/false 토글
 * set(false) // 직접 값 설정
 *
 * @example
 * // 초깃값 지정
 * const { isToggle } = useToggleState(false) // 초기값: false
 */
export default function useToggleState(initialValue: boolean = true) {
  const [isToggle, setIsToggle] = useState<boolean>(initialValue)

  const on = useCallback(() => setIsToggle(true), [])
  const off = useCallback(() => setIsToggle(false), [])
  const toggle = useCallback(() => setIsToggle((t) => !t), [])

  useEffect(() => {
    // 초깃값(initialValue) 변경 시, 상태 동기화
    setIsToggle(initialValue)
  }, [initialValue])

  return { isToggle, on, off, toggle, set: setIsToggle } as const
}
