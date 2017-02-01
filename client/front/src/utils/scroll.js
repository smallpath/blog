// The max width when fixed header will appear
const MAX_WIDTH = 768
// The height of fixed header
const HEADER_HEIGHT = 50

export function getElementRealPosition (hash) {
  const el = document.querySelector(hash)
  if (!el) return {x: 0, y: 0}
  const position = getElementPosition(el)
  const isMobile = window.innerWidth <= MAX_WIDTH
  const offset = isMobile ? HEADER_HEIGHT : 0
  position.y -= offset
  return position
}

function getElementPosition (el) {
  const docRect = document.documentElement.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}
