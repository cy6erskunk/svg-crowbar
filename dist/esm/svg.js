import { commenceDownload } from './util';
import { DEFAULT_FILENAME } from './const';

function download(source) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FILENAME;
  var url = URL.createObjectURL(new Blob([source.source], {
    type: 'text/xml'
  }));
  commenceDownload("".concat(filename, ".svg"), url, function () {
    return URL.revokeObjectURL(url);
  });
}

export default download;