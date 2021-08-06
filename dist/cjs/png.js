"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._fixSource = _fixSource;
exports["default"] = void 0;

var _const = require("./const");

var _util = require("./util");

function _fixSource(source) {
  return btoa(unescape(encodeURIComponent(source.replace(/[\u00A0-\u2666]/g, function (c) {
    return "&#".concat(c.charCodeAt(0), ";");
  }))));
}

var DEFAULT_OPTIONS = {
  debug: false,
  fixSource: _fixSource,
  scale: 1
};

function downloadPng(source) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _const.DEFAULT_FILENAME;

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? DEFAULT_OPTIONS.debug : _ref$debug,
      _ref$fixSource = _ref.fixSource,
      fixSource = _ref$fixSource === void 0 ? DEFAULT_OPTIONS.fixSource : _ref$fixSource,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? DEFAULT_OPTIONS.scale : _ref$scale;

  var canvas = document.createElement('canvas');
  var dpr = window.devicePixelRatio || 1;
  document.body.appendChild(canvas);
  canvas.setAttribute('id', 'svg-image');
  canvas.setAttribute('width', source.width * dpr * scale);
  canvas.setAttribute('height', source.height * dpr * scale);

  if (debug === false) {
    canvas.style.display = 'none';
  }

  var context = canvas.getContext('2d');
  var imgsrc = "data:image/svg+xml;base64,".concat(fixSource(source.source));
  var image = new Image();

  function onLoad() {
    context.scale(dpr * scale, dpr * scale);
    context.drawImage(image, 0, 0);
    var canvasdata = canvas.toDataURL('image/png');

    if (debug === false) {
      (0, _util.commenceDownload)("".concat(filename, ".png"), canvasdata, function () {
        return document.body.removeChild(canvas);
      });
    }
  }

  image.onload = onLoad;
  image.src = imgsrc;

  if (debug === true) {
    document.body.appendChild(image);
  }
}

var _default = downloadPng;
exports["default"] = _default;