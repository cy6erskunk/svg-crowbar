import getSource from './inputProcessor'
import download from './svg'
import downloadPNG from './png'

const downloadSvg = svgElement => download(getSource(svgElement))
export default downloadSvg
const downloadPng = svgElement => downloadPNG(getSource(svgElement))
export {downloadPng}
