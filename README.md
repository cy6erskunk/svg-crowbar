# SVG Crowbar Library
[![NPM version](https://img.shields.io/npm/v/svg-crowbar.svg)](https://www.npmjs.com/package/svg-crowbar)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/cy6erskunk/svg-crowbar.svg?branch=master)](https://travis-ci.com/cy6erskunk/svg-crowbar)

A standalone 3.5Kb JS client library based on Chrome [bookmarklet](https://nytimes.github.io/svg-crowbar/).

The library provides functionality to trigger a download of a given SVG file having all the styles inlined,
to make it look the same when opened independently from the original HTML page.

It is also possible to use this library to convert an SVG to a PNG before downloading.

## Usage
```javascript
import downloadSvg from 'svg-crowbar';

downloadSvg(document.querySelector('svg'));
```    
or
```javascript
import { downloadPng } from 'svg-crowbar';

downloadPng(document.querySelector('svg'), 'my_svg', { css: 'internal' });
```

### Function arguments

The `downloadSVG`/`downloadPNG` functions both have three arguments:

```javascript
downloadSVG([svgElement], [filename], [options])
downloadPNG([svgElement], [filename], [options])
```

#### svgElement (required)

A DOM element selector for an SVG, e.g. `document.querySelector('svg')`. An error is thrown if no valid SVG element was provided.

#### filename (optional)

A string to set the filename. This is determined by element id, class or page title, when not provided explicitly.

#### options (optional)

An object literal. It presently has just a single configurable property:

#### options.css (optional)

This setting determines how the SVG will be styled:

- `'inline'`: Default value. Adds inline styles from `getComputedStyle` on every element in the SVG.
- `'internal'`: Add an internal block of styles containing style rules from `document.styleSheets` instead.
- `false`: Don't add any CSS.

Example:
```javascript
// Add inline styles on SVG elements:
downloadSvg(document.querySelector('svg'), 'my_svg'); 
downloadSvg(document.querySelector('svg'), 'my_svg', { css: 'inline' });
// Add a <style> block in the SVG:
downloadSvg(document.querySelector('svg'), 'my_svg', { css: 'internal' });
// Do not add CSS:
downloadSvg(document.querySelector('svg'), 'my_svg', { css: false });
```