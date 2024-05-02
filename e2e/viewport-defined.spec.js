import { test, expect } from '@playwright/test'

test('png generation: viewbox is defined', async ({ page }) => {
  await page.goto('http://localhost:3000/index-umd.html')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'PNG' }).click()
  const download = await downloadPromise
  await download.saveAs(
    `./manual-tests/test-results/${download.suggestedFilename()}`
  )
  expect(download.suggestedFilename()).toBe('sample-png.png')
  await page.goto('http://localhost:3000/test-results/sample-png.png')
  await expect(page).toHaveScreenshot()
})
