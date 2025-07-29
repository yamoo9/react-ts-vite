import { useEffect, useRef, useState } from 'react'
import { getRandomCount, setAppColor, setDocumentTitle } from '../utils'
import Output from './output'

const ANIMATION_INTERVAL = 10 // 0.01초

export default function RandomCountApp() {
  const [count, setCount] = useState(0)
  const [targetCount] = useState(() => getRandomCount(30, 70))

  useEffect(() => {
    setDocumentTitle(targetCount)
    setAppColor()
  }, [targetCount])

  const isCompleted = count >= targetCount
  const animationRef = useRef<number>(undefined)

  useEffect(() => {
    let lastTime = 0

    function animate(timeStamp: number) {
      if (isCompleted) return

      if (!lastTime || timeStamp - lastTime >= ANIMATION_INTERVAL) {
        lastTime = timeStamp
        setCount((c) => c + 1)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }
    }
  }, [isCompleted])

  return <Output count={count} targetCount={targetCount} />
}
