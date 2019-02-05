import download from '../src/png'
import inputProcessor from '../src/inputProcessor'
// import {commenceDownload} from '../src/util'

jest.mock('../src/util')

test('pgn download requires source', () => {
  expect(download).toThrow()
})

test('download succeeds with empty SVG', () => {
  expect(() => download(inputProcessor(createSVG()))).not.toThrow()
})

test.todo('commenceDownload have been called')
