import {commenceDownload} from './util'
import {DEFAULT_FILENAME} from './const'

export function _fixSource(source) {
  return btoa(
    unescape(
      encodeURIComponent(source.replace(/[\u00A0-\u2666]/g, (c) => `&#${c.charCodeAt(0)};`)),
    ),
  )
}

const DEFAULT_OPTIONS = {
  debug: false,
  fixSource: _fixSource,
}

function downloadPng(source, filename = DEFAULT_FILENAME, {debug, fixSource} = DEFAULT_OPTIONS) {
  const canvas = document.createElement('canvas')
  const dpr = window.devicePixelRatio || 1
  document.body.appendChild(canvas)
  canvas.setAttribute('id', 'svg-image')
  canvas.setAttribute('width', source.width * dpr)
  canvas.setAttribute('height', source.height * dpr)
  if (!debug) {
    canvas.style.display = 'none'
  }

  const context = canvas.getContext('2d')
  const imgsrc = `data:image/svg+xml;base64,${fixSource(source.source)}`
  const image = new Image()

  function onLoad() {
    context.scale(dpr, dpr)
    context.drawImage(image, 0, 0, source.width * dpr, source.height * dpr)
    const canvasdata = canvas.toDataURL('image/png')

    if (!debug) {
      commenceDownload(`${filename}.png`, canvasdata, () => document.body.removeChild(canvas))
    }
  }

  image.onload = onLoad
  image.src = imgsrc
}

export default downloadPng
