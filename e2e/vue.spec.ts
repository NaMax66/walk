import { expect, test } from '@playwright/test'

test('boots the application at the root route', async ({ page }) => {
  const runtimeErrors: Error[] = []
  page.on('pageerror', (error) => runtimeErrors.push(error))

  const response = await page.goto('/')

  expect(response?.ok()).toBe(true)
  await expect(page.locator('#app[data-v-app]')).toBeAttached()
  expect(runtimeErrors).toEqual([])
})
