import * as utils from '../src/util'
import {prefix} from '../src/const'

const createSVG = () => document.createElementNS(prefix.svg, 'svg')
describe('getFilename', () => {
  test('throws when receves not  an SVG', () => {
    expect(utils.getFilename).toThrow()
  })

  test('uses default ', () => {
    expect(utils.getFilename(createSVG())).toBe(utils.DEFAULT_FILENAME)
  })
  test('uses id', () => {
    const id = 'boom'
    const elem = createSVG()
    elem.id = id
    expect(utils.getFilename(elem)).toEqual(id)
  })

  test('uses classname', () => {
    const classname = 'whatever'
    const elem = createSVG()
    elem.classList.add(classname)
    expect(utils.getFilename(elem)).toEqual(classname)
  })

  test('uses doc title', () => {
    const title = 'boom'
    document.title = title
    expect(utils.getFilename(createSVG())).toBe(title)
  })
})
