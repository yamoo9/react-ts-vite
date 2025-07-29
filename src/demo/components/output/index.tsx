import styles from './output.module.css'

interface Props {
  count: number
  targetCount: number
}

export default function Output({ count, targetCount }: Props) {
  const isAnimate = count < targetCount

  return (
    <output
      className={`${styles.output} ${isAnimate ? styles.isAnimate : ''}`.trim()}
    >
      {count}
    </output>
  )
}
