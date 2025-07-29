const ORIGIN_TITLE = document.title

export default function setDocumentTitle(targetCount: number) {
  document.title = `${targetCount} | ${ORIGIN_TITLE}`
}
