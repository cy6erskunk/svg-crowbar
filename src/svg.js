import {getFilename} from './util'
import {REMOVE_TIMEOUT} from './const'

function download(source) {
  const filename = getFilename(source)

  const url = window.URL.createObjectURL(new Blob(source.source, {type: 'text/xml'}))

  const a = document.createElement('a')
  document.body.appendChild(a)
  a.setAttribute('class', 'svg-crowbar')
  a.setAttribute('download', `${filename}.svg`)
  a.setAttribute('href', url)
  a.style.display = 'none'
  a.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, REMOVE_TIMEOUT)
}

export default download
