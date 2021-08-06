"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadPng = exports.downloadSvg = exports["default"] = void 0;

var _inputProcessor = _interopRequireDefault(require("./inputProcessor"));

var _svg = _interopRequireDefault(require("./svg"));

var _png = _interopRequireDefault(require("./png"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var downloadSvg = function downloadSvg(svgElement, filename, options) {
  return (0, _svg["default"])((0, _inputProcessor["default"])(svgElement, options), filename || (0, _util.getFilename)(svgElement));
};

exports.downloadSvg = downloadSvg;
var _default = downloadSvg;
exports["default"] = _default;

var downloadPng = function downloadPng(svgElement, filename, options) {
  return (0, _png["default"])((0, _inputProcessor["default"])(svgElement, options), filename || (0, _util.getFilename)(svgElement), options === null || options === void 0 ? void 0 : options.downloadPNGOptions);
};

exports.downloadPng = downloadPng;