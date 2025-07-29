const MIN = 0
const MAX = 100

export default function getRandomCount(min = MIN, max = MAX) {
  return Math.round(Math.random() * (max - min) + min)
}
