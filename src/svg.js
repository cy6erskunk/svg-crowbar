import {getFilename, commenceDownload} from './util'

function download(source) {
  const filename = getFilename(source)
  const url = window.URL.createObjectURL(new Blob(source.source, {type: 'text/xml'}))

  commenceDownload(`${filename}.svg`, url, () => window.URL.revokeObjectURL(url))
}

export default download
