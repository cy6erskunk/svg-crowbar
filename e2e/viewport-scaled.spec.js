import { test, expect } from '@playwright/test'

// Intrinsic size of the fixtures' SVG (its viewBox is "0 0 500 300").
const INTRINSIC_WIDTH = 500
const INTRINSIC_HEIGHT = 300

// https://github.com/cy6erskunk/svg-crowbar/issues/75
// When the SVG's DOM box differs from its intrinsic size, the exported PNG must
// preserve the intrinsic dimensions (width/height attributes, else the viewBox)
// rather than the DOM box - otherwise a scaled-down box crops the image and a
// scaled-up box pads it with transparent space.

async function exportedPngSize(page, url, filename) {
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'PNG' }).click()
  const download = await downloadPromise
  await download.saveAs(`./manual-tests/test-results/${filename}`)

  const dpr = await page.evaluate(() => window.devicePixelRatio || 1)
  const size = await page.evaluate(
    (src) =>
      new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () =>
          resolve({ width: img.naturalWidth, height: img.naturalHeight })
        img.onerror = reject
        img.src = src
      }),
    // cache-buster so a re-run does not read a stale decode
    `http://localhost:3000/test-results/${filename}?_=${encodeURIComponent(filename)}`
  )

  return { ...size, dpr }
}

test('png generation: viewbox scaled down keeps intrinsic size (issue #75)', async ({
  page
}) => {
  await page.goto('http://localhost:3000/index-umd-viewbox-scaled-down.html')
  const { width, height, dpr } = await exportedPngSize(
    page,
    'index-umd-viewbox-scaled-down.html',
    'sample-png-scaled-down.png'
  )
  expect({ width, height }).toEqual({
    width: INTRINSIC_WIDTH * dpr,
    height: INTRINSIC_HEIGHT * dpr
  })
})

test('png generation: viewbox scaled up keeps intrinsic size (issue #75)', async ({
  page
}) => {
  await page.goto('http://localhost:3000/index-umd-viewbox-scaled-up.html')
  const { width, height, dpr } = await exportedPngSize(
    page,
    'index-umd-viewbox-scaled-up.html',
    'sample-png-scaled-up.png'
  )
  expect({ width, height }).toEqual({
    width: INTRINSIC_WIDTH * dpr,
    height: INTRINSIC_HEIGHT * dpr
  })
})

// The issue's CodeSandbox repro: width/height attributes + viewBox, forced to
// 100% of a smaller parent. Exercises the width/height-attribute branch of a
// fix rather than the viewBox branch above.
test('png generation: width/height attrs with css 100% keep intrinsic size (issue #75)', async ({
  page
}) => {
  await page.goto(
    'http://localhost:3000/index-umd-viewbox-with-size-attrs.html'
  )
  const { width, height, dpr } = await exportedPngSize(
    page,
    'index-umd-viewbox-with-size-attrs.html',
    'sample-png-size-attrs.png'
  )
  expect({ width, height }).toEqual({
    width: INTRINSIC_WIDTH * dpr,
    height: INTRINSIC_HEIGHT * dpr
  })
})
