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
