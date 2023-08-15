import { prefix } from '../src/const'

global.createSVG = () => document.createElementNS(prefix.svg, 'svg')
Object.defineProperty(global, 'URL', {
  writable: true,
  value: {
    createObjectURL: jest.fn()
  }
})
