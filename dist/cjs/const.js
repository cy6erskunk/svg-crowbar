"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_FILENAME = exports.REMOVE_TIMEOUT = exports.prefix = exports.doctype = void 0;
var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
exports.doctype = doctype;
var prefix = {
  xmlns: 'http://www.w3.org/2000/xmlns/',
  xlink: 'http://www.w3.org/1999/xlink',
  svg: 'http://www.w3.org/2000/svg'
};
exports.prefix = prefix;
var REMOVE_TIMEOUT = 10;
exports.REMOVE_TIMEOUT = REMOVE_TIMEOUT;
var DEFAULT_FILENAME = 'untitled';
exports.DEFAULT_FILENAME = DEFAULT_FILENAME;