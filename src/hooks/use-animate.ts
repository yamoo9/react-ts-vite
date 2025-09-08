import { useEffect, useRef, useState } from 'react'
import { Timeout } from '@/@types/global'

export default function useAnimate(open: boolean, duration: number = 300) {
  const [visible, setVisible] = useState(open)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<Timeout>(undefined)

  useEffect(() => {
    if (open) {
      setVisible(true)
      setAnimating(true)
      timerRef.current = setTimeout(() => setAnimating(false), duration)
    } else if (visible) {
      setAnimating(true)
      timerRef.current = setTimeout(() => {
        setAnimating(false)
        setVisible(false)
      }, duration)
    }
    return () => clearTimeout(timerRef.current)
  }, [open, duration, visible])

  return { visible, animating }
}
