"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("./util");

var _const = require("./const");

function download(source) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _const.DEFAULT_FILENAME;
  var url = URL.createObjectURL(new Blob([source.source], {
    type: 'text/xml'
  }));
  (0, _util.commenceDownload)("".concat(filename, ".svg"), url, function () {
    return URL.revokeObjectURL(url);
  });
}

var _default = download;
exports["default"] = _default;