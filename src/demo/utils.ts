/**
 * 지정된 범위 내에서 랜덤한 숫자를 반환하는 함수
 * @param min - 최소값 (기본값: 1)
 * @param max - 최대값 (기본값: 10)
 * @returns 랜덤한 숫자
 */
export function getRandomCount(min = 1, max = 10) {
  return Math.round(Math.random() * (max - min) + min)
}

export function getRandomHueColor() {
  return getRandomCount(0, 360)
}

export function setAppColor() {
  const value = getRandomHueColor()
  document.body.style.setProperty('--hue', `${value}`)
}

const ORIGIN_TITLE = document.title

export function setDocumentTitle(targetCount: number | string) {
  document.title = `(${targetCount}) ${ORIGIN_TITLE}`
}
