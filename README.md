# SVG Crowbar Library
[![NPM version](https://img.shields.io/npm/v/svg-crowbar.svg)](https://www.npmjs.com/package/svg-crowbar)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/cy6erskunk/svg-crowbar.svg?branch=master)](https://travis-ci.com/cy6erskunk/svg-crowbar)

A standalone 3.5Kb JS client library based on Chrome [bookmarklet](https://nytimes.github.io/svg-crowbar/).

The library provides functionality to trigger a download of a given SVG file having alle the styles inlined,
to make it look the same when opened independently from the original HTML page.

It is also possible to use this library to convert an SVG to a PNG before downloading.

## Usage
```javascript
import downloadSvg from 'svg-crowbar';

downloadSvg(document.querySelector('svg'), 'my_svg', 'external');
```    
or
```javascript
import { downloadPng } from 'svg-crowbar';

downloadPng(document.querySelector('svg'));
```

Filename is determined by element id, class or page title, when not provided explicitly.

The optional third argument (which defaults to `'inline'`) can be set to `'external'` if you wish to use a block of styles from `document.styleSheets`, instead of adding inline styles from `getComputedStyle` on every element in the SVG. If you'd prefer that no CSS be added, then set the value to `false`.

An error is thrown in case no valid SVG element was provided.
