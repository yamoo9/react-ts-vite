import getRandomHueColor from './get-random-color'

export default function setAppColor() {
  document.body.style.setProperty('--hue', `${getRandomHueColor()}`)
}
