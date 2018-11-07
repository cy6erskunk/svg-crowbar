# SVG Crowbar Lib
[![NPM version](https://img.shields.io/npm/v/svg-crowbar.svg)](https://www.npmjs.com/package/nsp-reporter-teamcity)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A library based on Chrome-specific [bookmarklet](https://nytimes.github.io/svg-crowbar/)

## Usage
```javascript
import downloadSvg from 'svg-crowbar';

downloadSvg(document.querySelector('svg'));
```    
or
```javascript
import { downloadPng } from 'svg-crowbar';

downloadPng(document.querySelector('svg'));
```