import { type ChangeEvent, useCallback, useEffect, useState } from 'react'

/**
 * 입력값 상태 및 onChange 핸들러를 반환하는 커스텀 훅입니다.
 *
 * @template T 입력값의 타입
 *
 * @example
 * // 문자열 입력 관리
 * const nameInput = useInput('', v => v)
 * <input value={nameInput.value} onChange={nameInput.onChange} />
 *
 * @example
 * // 숫자 입력 관리
 * const ageInput = useInput(0, v => Number(v))
 * <input value={ageInput.value} onChange={ageInput.onChange} type="number" />
 *
 * @example
 * // JSON 파싱 예시
 * const jsonInput = useInput({}, v => {
 *   try {
 *     return JSON.parse(v)
 *   } catch {
 *     return {}
 *   }
 * })
 * <input value={JSON.stringify(jsonInput.value)} onChange={jsonInput.onChange} />
 */
export default function useInput<T>(
  initialValue: T,
  parser: (value: string) => T
) {
  const [value, setValue] = useState<T>(initialValue)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(parser(e.target.value))
    },
    [parser]
  )

  useEffect(() => {
    // 초깃값(initialValue) 변경 시, 상태 동기화
    setValue(initialValue)
  }, [initialValue])

  return { value, onChange }
}
