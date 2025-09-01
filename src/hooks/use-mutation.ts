import { useCallback } from 'react'
import type { Draft } from 'immer'
import { useImmer } from 'use-immer'
import { type State } from '@/@types/global'

// 추가 옵션 타입
interface Options<T> {
  autoReset?: boolean // 성공/실패 후 자동 초기화 여부
  onSuccess?: (data: T) => void // 성공 콜백
  onError?: (error: Error) => void // 실패 콜백
}

// useMutation 인자 타입 정의
// A: mutateFn에 전달할 인자 타입
// T: 성공 시 반환 데이터 타입
interface Config<A, T> extends Options<T> {
  mutateFn: (...args: A[]) => Promise<Response>
}

// 초기 상태 생성 함수 (제네릭 T 적용)
const INITIAL_STATE = <T>(): State<T> => ({
  status: 'idle',
  error: null,
  data: null,
})

export default function useMutation<
  A = unknown, // mutateFn에 전달할 인자 타입
  T = unknown, // 요청 성공 시, 반환 데이터 타입
>({ mutateFn, autoReset = false, onSuccess, onError }: Config<A, T>) {
  const [state, setState] = useImmer<State<T>>(INITIAL_STATE<T>())

  const isLoading = state.status === 'pending'
  const hasError = state.status === 'rejected'
  const isSuccess = state.status === 'resolved'

  const mutate = useCallback(
    async (...args: A[]) => {
      setState((draft) => {
        draft.status = 'pending'
        draft.error = null
      })

      try {
        const response = await mutateFn(...args)
        const responseData = await response.json()

        if (!response.ok) {
          // Response 객체를 throw
          throw response
        }

        setState((draft) => {
          draft.status = 'resolved'
          draft.data = responseData as Draft<T>
        })

        onSuccess?.(responseData as T)

        if (autoReset) {
          setTimeout(() => setState(INITIAL_STATE<T>()), 1500)
        }

        return responseData as T
      } catch (error) {
        const message = await extractErrorMessage(error)
        const errorObj = new Error(message)
        setState((draft) => {
          draft.status = 'rejected'
          draft.error = errorObj
        })
        onError?.(errorObj)
        if (autoReset) {
          setTimeout(() => setState(INITIAL_STATE<T>()), 1500)
        }
        throw errorObj
      }
    },
    [mutateFn, setState, autoReset, onSuccess, onError]
  )

  const reset = useCallback(() => setState(INITIAL_STATE<T>()), [setState])

  return { ...state, isLoading, hasError, isSuccess, mutate, reset }
}

// 에러 메시지 추출 함수
const extractErrorMessage = async (error: unknown): Promise<string> => {
  if (error instanceof Response) {
    try {
      const contentType = error.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        const json = await error.json()
        return typeof json === 'string'
          ? json
          : json.message || JSON.stringify(json)
      } else {
        return await error.text()
      }
    } catch {
      return error.statusText || 'Unknown Error'
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
