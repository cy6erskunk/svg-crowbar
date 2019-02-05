import getSource from './inputProcessor'
import download from './svg'
import downloadPNG from './png'
import {getFilename} from './util'

const downloadSvg = (svgElement, filename) =>
  download(getSource(svgElement), filename || getFilename(svgElement))
export default downloadSvg
const downloadPng = (svgElement, filename) =>
  downloadPNG(getSource(svgElement), filename || getFilename(svgElement))
export {downloadPng}
