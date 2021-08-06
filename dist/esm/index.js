import getSource from './inputProcessor';
import download from './svg';
import downloadPNG from './png';
import { getFilename } from './util';

var downloadSvg = function downloadSvg(svgElement, filename, options) {
  return download(getSource(svgElement, options), filename || getFilename(svgElement));
};

export default downloadSvg;

var downloadPng = function downloadPng(svgElement, filename, options) {
  return downloadPNG(getSource(svgElement, options), filename || getFilename(svgElement), options === null || options === void 0 ? void 0 : options.downloadPNGOptions);
};

export { downloadSvg, downloadPng };