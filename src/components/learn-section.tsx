import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ title: string; showTitle?: boolean }>

export default function LearnSection(props: Props) {
  const { title, showTitle = false, children, ...restProps } = props

  return (
    <section {...restProps}>
      <h1 className={!showTitle ? 'sr-only' : undefined}>{title}</h1>
      {children}
    </section>
  )
}
