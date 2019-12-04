import getSource from './inputProcessor'
import download from './svg'
import downloadPNG from './png'
import {getFilename} from './util'

const downloadSvg = (svgElement, filename, css) =>
  download(getSource(svgElement, css), filename || getFilename(svgElement))
export default downloadSvg
const downloadPng = (svgElement, filename, css) =>
  downloadPNG(getSource(svgElement, css), filename || getFilename(svgElement))
export {downloadPng}
