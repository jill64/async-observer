import { expect, test } from '@playwright/test'

test('smoke', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('IDLE')).toBeVisible()
  await page.getByRole('button', { name: 'Button' }).click()
  await expect(page.getByText('PENDING')).toBeVisible()
  await expect(page.getByText('FULFILLED')).toBeVisible()
})
