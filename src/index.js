import getSource from './inputProcessor'
import download from './svg'
import downloadPNG from './png'

const downloadSvg = (svgElement, filename) => download(getSource(svgElement), filename)
export default downloadSvg
const downloadPng = (svgElement, filename) => downloadPNG(getSource(svgElement), filename)
export {downloadPng}
