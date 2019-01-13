import {getFilename, commenceDownload} from './util'

function download(source, filename) {
  const url = window.URL.createObjectURL(new Blob(source.source, {type: 'text/xml'}))

  commenceDownload(`${filename || getFilename(source)}.svg`, url, () =>
    window.URL.revokeObjectURL(url),
  )
}

export default download
