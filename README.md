# SVG Crowbar Lib

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