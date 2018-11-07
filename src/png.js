import getSource from './inputProcessor'
import {getFilename} from './util'
import {REMOVE_TIMEOUT} from './const'

function downloadPNG(source) {
  const filename = getFilename(source)

  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.setAttribute('id', 'svg-image')
  canvas.setAttribute('width', source.width)
  canvas.setAttribute('height', source.height)
  canvas.style.display = 'none'

  const context = canvas.getContext('2d')
  const imgsrc = `data:image/svg+xml;base64,${btoa(source.source)}`
  const image = new Image()

  function onLoad() {
    context.drawImage(image, 0, 0)
    const canvasdata = canvas.toDataURL('image/png')

    const a = document.createElement('a')
    a.download = `${filename}.png`
    a.href = canvasdata
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
    }, REMOVE_TIMEOUT)
  }

  image.src = imgsrc
  image.onload = onLoad
}

const downloadPng = svgElement => downloadPNG(getSource(svgElement))
export default downloadPng
