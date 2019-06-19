import {commenceDownload} from './util'
import {DEFAULT_FILENAME} from './const'

function downloadPng(source, filename = DEFAULT_FILENAME) {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.setAttribute('id', 'svg-image')
  canvas.setAttribute('width', source.width)
  canvas.setAttribute('height', source.height)
  canvas.style.display = 'none'

  const context = canvas.getContext('2d')
  const safeSource = source.source.replace(/[\u00A0-\u2666]/g, c => `&#${c.charCodeAt(0)};`)
  const imgsrc = `data:image/svg+xml;base64,${btoa(safeSource)}`
  const image = new Image()

  function onLoad() {
    context.drawImage(image, 0, 0)
    const canvasdata = canvas.toDataURL('image/png')

    commenceDownload(`${filename}.png`, canvasdata, () => document.body.removeChild(canvas))
  }

  image.onload = onLoad
  image.src = imgsrc
}

export default downloadPng
