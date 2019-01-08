import {REMOVE_TIMEOUT} from './const'

export function getFilename(source) {
  let filename = 'untitled'

  if (source.id) {
    filename = source.id
  } else if (source.class) {
    filename = source.class
  } else if (window.document.title) {
    filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  }
  return filename
}

export function commenceDownload(filename, imgdata, callback) {
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.setAttribute('class', 'svg-crowbar')
  a.setAttribute('download', filename)
  a.setAttribute('href', imgdata)
  a.style.display = 'none'
  a.click()

  setTimeout(() => {
    if (callback) {
      callback()
    }
    document.body.removeChild(a)
  }, REMOVE_TIMEOUT)
}
