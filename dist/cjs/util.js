"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilename = getFilename;
exports.commenceDownload = commenceDownload;

var _const = require("./const");

function getFilename(source) {
  if (!(source instanceof SVGElement)) {
    throw new Error('SVG Element is required');
  }

  return source.getAttribute('id') || source.getAttribute('class') || document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase() || _const.DEFAULT_FILENAME;
}

function commenceDownload(filename, imgdata, callback) {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('class', 'svg-crowbar');
  a.setAttribute('download', filename);
  a.setAttribute('href', imgdata);
  a.style.display = 'none';
  a.click();
  setTimeout(function () {
    if (callback) {
      callback();
    }

    document.body.removeChild(a);
  }, _const.REMOVE_TIMEOUT);
}